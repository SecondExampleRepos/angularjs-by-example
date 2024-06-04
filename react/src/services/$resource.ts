import axios from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, any>;
}

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  interceptor?: {
    response?: (response: any) => any;
    responseError?: (error: any) => any;
  };
}

interface ResourceInstance {
  $promise?: Promise<any>;
  $resolved?: boolean;
  [key: string]: any;
}

class Resource {
  private template: string;
  private defaults: ResourceOptions;
  private urlParams: Record<string, boolean>;

  constructor(template: string, options: ResourceOptions = {}) {
    this.template = template;
    this.defaults = {
      stripTrailingSlashes: true,
      actions: {
        get: { method: 'GET' },
        save: { method: 'POST' },
        query: { method: 'GET', isArray: true },
        remove: { method: 'DELETE' },
        delete: { method: 'DELETE' },
      },
      ...options,
    };
    this.urlParams = {};
  }

  private setUrlParams(config: any, params: Record<string, any>, url: string) {
    const urlParams: Record<string, boolean> = {};
    const template = url || this.template;

    template.split(/\W/).forEach((param) => {
      if (param === 'hasOwnProperty') {
        throw new Error(`Bad parameter name: ${param}`);
      }
      if (!/^\d+$/.test(param) && param) {
        const regex = new RegExp(`(^|[^\\\\]):${param}(\\W|$)`);
        if (regex.test(template)) {
          urlParams[param] = true;
        }
      }
    });

    let finalUrl = template.replace(/\\:/g, ':');
    Object.keys(urlParams).forEach((param) => {
      const value = params.hasOwnProperty(param) ? params[param] : this.defaults[param];
      if (value !== undefined && value !== null) {
        const encodedValue = encodeURIComponent(value)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '%20')
          .replace(/%26/gi, '&')
          .replace(/%3D/gi, '=')
          .replace(/%2B/gi, '+');
        finalUrl = finalUrl.replace(new RegExp(`:${param}(\\W|$)`, 'g'), (match, p1) => `${encodedValue}${p1}`);
      } else {
        finalUrl = finalUrl.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, p1, p2) => (p2.charAt(0) === '/' ? p2 : `${p1}${p2}`));
      }
    });

    if (this.defaults.stripTrailingSlashes) {
      finalUrl = finalUrl.replace(/\/+$/, '') || '/';
    }

    finalUrl = finalUrl.replace(/\/\.(?=\w+($|\?))/, '.');
    config.url = finalUrl.replace(/\/\\\./, '/.');
    Object.keys(params).forEach((param) => {
      if (!urlParams[param]) {
        config.params = config.params || {};
        config.params[param] = params[param];
      }
    });
  }

  private static copy(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  private static extend(target: any, ...sources: any[]) {
    sources.forEach((source) => {
      if (source) {
        Object.keys(source).forEach((key) => {
          target[key] = source[key];
        });
      }
    });
    return target;
  }

  private static forEach(obj: any, iterator: (value: any, key: string) => void) {
    Object.keys(obj).forEach((key) => {
      iterator(obj[key], key);
    });
  }

  private static isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

  public bind(additionalParams: Record<string, any>) {
    return new Resource(this.template, Resource.extend({}, this.defaults, additionalParams));
  }

  public createActions(actions: Record<string, ResourceAction>) {
    const resource = this;
    const result: Record<string, any> = {};

    Resource.forEach(actions, (action, name) => {
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      result[name] = function (params: any, data: any, success: any, error: any) {
        let hasBody = isPostOrPutOrPatch;
        let requestParams = params;
        let requestData = data;
        let successCallback = success;
        let errorCallback = error;

        switch (arguments.length) {
          case 4:
            break;
          case 3:
          case 2:
            if (Resource.isFunction(params)) {
              successCallback = params;
              errorCallback = data;
              requestParams = {};
              requestData = hasBody ? {} : null;
            } else if (Resource.isFunction(data)) {
              successCallback = data;
              errorCallback = success;
              requestData = hasBody ? params : null;
              requestParams = hasBody ? {} : params;
            }
            break;
          case 1:
            if (Resource.isFunction(params)) {
              successCallback = params;
              requestParams = {};
              requestData = hasBody ? {} : null;
            } else {
              requestParams = params;
              requestData = hasBody ? params : null;
            }
            break;
          case 0:
            requestParams = {};
            requestData = hasBody ? {} : null;
            break;
          default:
            throw new Error(`Bad number of arguments: ${arguments.length}`);
        }

        const config: any = {
          method: action.method,
          url: '',
          params: {},
          data: requestData,
        };

        resource.setUrlParams(config, Resource.extend({}, requestParams, action.params), action.url);

        const promise = axios(config)
          .then((response) => {
            const data = response.data;
            if (action.isArray) {
              if (!Array.isArray(data)) {
                throw new Error(`Expected array but got ${typeof data}`);
              }
              return data.map((item) => new ResourceInstance(item));
            } else {
              return new ResourceInstance(data);
            }
          })
          .then((data) => {
            if (successCallback) {
              successCallback(data);
            }
            return data;
          })
          .catch((error) => {
            if (errorCallback) {
              errorCallback(error);
            }
            return Promise.reject(error);
          });

        return promise;
      };

      result[`$${name}`] = function (params: any, data: any, success: any, error: any) {
        return result[name].apply(this, arguments).then((response: any) => {
          this.$resolved = true;
          this.$promise = response;
          return response;
        });
      };
    });

    return result;
  }
}

export default Resource;