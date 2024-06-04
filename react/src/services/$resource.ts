// react/src/services/$resource.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  url?: string;
  interceptor?: {
    response?: (response: AxiosResponse) => any;
    responseError?: (error: any) => any;
  };
}

interface ResourceActions {
  [key: string]: ResourceAction;
}

interface ResourceDefaults {
  stripTrailingSlashes: boolean;
  actions: ResourceActions;
}

interface ResourceOptions {
  actions?: ResourceActions;
}

interface ResourceInstance {
  $promise?: Promise<any>;
  $resolved?: boolean;
  [key: string]: any;
}

class Resource {
  private template: string;
  private defaults: ResourceDefaults;
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

  private setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url: string) {
    const urlParams = this.urlParams;
    const template = url || this.template;

    Object.keys(template.split(/\W/)).forEach((param) => {
      if (!/^\d+$/.test(param) && param && new RegExp(`(^|[^\\\\]):${param}(\\W|$)`).test(template)) {
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
        finalUrl = finalUrl.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, leadingSlash, trailingPart) => (trailingPart.charAt(0) === '/' ? trailingPart : leadingSlash + trailingPart));
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

  public bind(additionalParams: Record<string, any>) {
    return new Resource(this.template, Resource.extend({}, this.defaults, additionalParams));
  }

  public static createResource(template: string, options: ResourceOptions = {}) {
    const resource = new Resource(template, options);
    const actions = Resource.extend({}, resource.defaults.actions, options.actions);

    class ResourceInstanceClass {
      [key: string]: any;

      constructor(data?: any) {
        if (data) {
          Resource.extend(this, data);
        }
      }

      toJSON() {
        const data = Resource.copy(this);
        delete data.$promise;
        delete data.$resolved;
        return data;
      }
    }

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      ResourceInstanceClass[actionName] = function (params: any, data: any, success: any, error: any) {
        let hasBody = isPostOrPutOrPatch;
        let requestParams = params;
        let requestData = data;
        let successCallback = success;
        let errorCallback = error;

        switch (arguments.length) {
          case 4:
            errorCallback = error;
            successCallback = success;
            break;
          case 3:
          case 2:
            if (Resource.isFunction(data)) {
              errorCallback = success;
              successCallback = data;
              requestData = params;
              requestParams = {};
            } else {
              requestData = data;
              requestParams = params;
            }
            break;
          case 1:
            if (Resource.isFunction(params)) {
              successCallback = params;
              requestParams = {};
            } else {
              requestParams = params;
            }
            break;
          case 0:
            break;
          default:
            throw new Error(`Expected up to 4 arguments [params, data, success, error], got ${arguments.length} arguments`);
        }

        const instance = this instanceof ResourceInstanceClass ? this : new ResourceInstanceClass(requestData);
        const config: AxiosRequestConfig = { method: action.method, url: '' };
        const urlParams = Resource.extend({}, resource.defaults, requestParams);

        resource.setUrlParams(config, urlParams, action.url);

        if (hasBody) {
          config.data = requestData;
        }

        const promise = axios(config)
          .then((response) => {
            const responseData = response.data;
            if (action.isArray) {
              if (!Array.isArray(responseData)) {
                throw new Error(`Expected response to be an array but got ${typeof responseData}`);
              }
              instance.length = 0;
              responseData.forEach((item: any) => {
                instance.push(new ResourceInstanceClass(item));
              });
            } else {
              Resource.extend(instance, responseData);
            }
            instance.$resolved = true;
            (successCallback || Resource.noop)(instance, response.headers);
            return instance;
          })
          .catch((error) => {
            instance.$resolved = true;
            (errorCallback || Resource.noop)(error);
            return Promise.reject(error);
          });

        instance.$promise = promise;
        instance.$resolved = false;

        return instance;
      };

      ResourceInstanceClass.prototype[`$${actionName}`] = function (params: any, success: any, error: any) {
        if (Resource.isFunction(params)) {
          error = success;
          success = params;
          params = {};
        }
        const result = ResourceInstanceClass[actionName].call(this, params, this, success, error);
        return result.$promise || result;
      };
    });

    return ResourceInstanceClass;
  }
}

export default Resource;