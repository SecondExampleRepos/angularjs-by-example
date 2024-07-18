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

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: ResourceActions;
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
        ...options.actions,
      },
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
        finalUrl = finalUrl.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, leadingSlashes, trailingPart) => (trailingPart.charAt(0) === '/' ? trailingPart : leadingSlashes + trailingPart));
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

  private static isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

  private static noop() {}

  public bind(additionalOptions: ResourceOptions) {
    return new Resource(this.template, Resource.extend({}, this.defaults, additionalOptions));
  }

  public createActions(actions: ResourceActions) {
    const resourceInstance: ResourceInstance = {};

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resourceInstance[actionName] = (params: any = {}, data: any = {}, success?: Function, error?: Function) => {
        const config: AxiosRequestConfig = {
          method: action.method,
          ...action,
        };

        if (isPostOrPutOrPatch) {
          config.data = data;
        }

        this.setUrlParams(config, params, action.url);

        const promise = axios(config)
          .then((response) => {
            const responseData = action.isArray ? response.data.map((item: any) => new ResourceInstance(item)) : new ResourceInstance(response.data);
            if (action.interceptor && action.interceptor.response) {
              return action.interceptor.response(response);
            }
            if (success) {
              success(responseData, response.headers);
            }
            return responseData;
          })
          .catch((errorResponse) => {
            if (action.interceptor && action.interceptor.responseError) {
              return action.interceptor.responseError(errorResponse);
            }
            if (error) {
              error(errorResponse);
            }
            return Promise.reject(errorResponse);
          });

        resourceInstance.$promise = promise;
        resourceInstance.$resolved = false;

        promise.finally(() => {
          resourceInstance.$resolved = true;
        });

        return resourceInstance;
      };

      resourceInstance[`$${actionName}`] = function (params: any, success?: Function, error?: Function) {
        return resourceInstance[actionName](params, this, success, error).$promise;
      };
    });

    return resourceInstance;
  }
}

export default Resource;
