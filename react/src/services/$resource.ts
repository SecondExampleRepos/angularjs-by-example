import axios from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, any>;
}

interface ResourceParams {
  [key: string]: any;
}

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: ResourceParams;
  interceptor?: {
    response?: (response: any) => any;
    responseError?: (error: any) => any;
  };
}

interface ResourceActions {
  [key: string]: ResourceAction;
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

  private setUrlParams(config: any, params: ResourceParams, url: string) {
    const urlParams = this.urlParams;
    const template = url || this.template;

    Object.keys(template.split(/\W/)).forEach((param) => {
      if (!/^\d+$/.test(param) && param) {
        urlParams[param] = true;
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
        finalUrl = finalUrl.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, p1, p2) => (p2.charAt(0) === '/' ? p2 : p1 + p2));
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

  private static copy(source: any) {
    return JSON.parse(JSON.stringify(source));
  }

  private static isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

  private static noop() {}

  public bind(additionalParams: ResourceParams) {
    return new Resource(this.template, Resource.extend({}, this.defaults, additionalParams));
  }

  public createActions(actions: ResourceActions) {
    const resourceInstance: ResourceInstance = {};

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resourceInstance[actionName] = (params: any, data: any, success: any, error: any) => {
        let hasBody = isPostOrPutOrPatch;
        let requestParams = params;
        let requestData = data;
        let successCallback = success;
        let errorCallback = error;

        switch (arguments.length) {
          case 4:
            break;
          case 3:
            if (Resource.isFunction(params)) {
              successCallback = params;
              errorCallback = data;
              requestParams = {};
              requestData = {};
            } else {
              successCallback = data;
              errorCallback = success;
              requestData = params;
              requestParams = {};
            }
            break;
          case 2:
            if (Resource.isFunction(params)) {
              successCallback = params;
              errorCallback = data;
              requestParams = {};
              requestData = {};
            } else {
              requestData = params;
              requestParams = {};
            }
            break;
          case 1:
            if (Resource.isFunction(params)) {
              successCallback = params;
              requestParams = {};
              requestData = {};
            } else {
              requestData = params;
              requestParams = {};
            }
            break;
          case 0:
            requestParams = {};
            requestData = {};
            break;
          default:
            throw new Error(`Unexpected number of arguments: ${arguments.length}`);
        }

        const config: any = {
          method: action.method,
          url: '',
          params: {},
          data: hasBody ? requestData : undefined,
        };

        this.setUrlParams(config, Resource.extend({}, requestParams, action.params), action.url);

        const promise = axios(config)
          .then((response) => {
            const responseData = action.interceptor?.response ? action.interceptor.response(response) : response.data;
            if (successCallback) successCallback(responseData, response.headers);
            return responseData;
          })
          .catch((error) => {
            if (errorCallback) errorCallback(error);
            return Promise.reject(error);
          });

        resourceInstance.$promise = promise;
        resourceInstance.$resolved = false;

        return resourceInstance;
      };

      resourceInstance[`$${actionName}`] = function (params: any, success: any, error: any) {
        return resourceInstance[actionName](params, success, error).$promise;
      };
    });

    return resourceInstance;
  }
}

export default Resource;