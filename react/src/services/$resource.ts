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

const defaultOptions: ResourceOptions = {
  stripTrailingSlashes: true,
  actions: {
    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET', isArray: true },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' },
  },
};

class Resource {
  private template: string;
  private defaults: ResourceOptions;
  private urlParams: Record<string, boolean>;

  constructor(template: string, options: ResourceOptions = {}) {
    this.template = template;
    this.defaults = { ...defaultOptions, ...options };
    this.urlParams = {};
  }

  private setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url?: string) {
    let urlTemplate = url || this.template;
    const urlParams: Record<string, boolean> = {};

    urlTemplate.split(/\W/).forEach((param) => {
      if (!/^\d+$/.test(param) && param) {
        urlParams[param] = true;
      }
    });

    urlTemplate = urlTemplate.replace(/\\:/g, ':');
    Object.keys(urlParams).forEach((param) => {
      const value = params[param] || this.defaults[param];
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
        urlTemplate = urlTemplate.replace(new RegExp(`:${param}(\\W|$)`, 'g'), `${encodedValue}$1`);
      } else {
        urlTemplate = urlTemplate.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, leadingSlash, tail) => (tail.charAt(0) === '/' ? tail : leadingSlash + tail));
      }
    });

    if (this.defaults.stripTrailingSlashes) {
      urlTemplate = urlTemplate.replace(/\/+$/, '') || '/';
    }

    urlTemplate = urlTemplate.replace(/\/\.(?=\w+($|\?))/, '.');
    config.url = urlTemplate.replace(/\/\\\./, '/.');

    Object.keys(params).forEach((param) => {
      if (!urlParams[param]) {
        config.params = config.params || {};
        config.params[param] = params[param];
      }
    });
  }

  private static handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private static handleError(error: any) {
    return Promise.reject(error);
  }

  public createActions(actions: ResourceActions) {
    const resourceInstance: ResourceInstance = {};

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resourceInstance[actionName] = (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
        const config: AxiosRequestConfig = {
          method: action.method,
          ...action,
        };

        if (isPostOrPutOrPatch) {
          config.data = data;
        } else {
          config.params = data;
        }

        this.setUrlParams(config, params, action.url);

        const promise = axios(config)
          .then((response) => {
            const result = action.interceptor?.response ? action.interceptor.response(response) : Resource.handleResponse(response);
            if (success) success(result);
            return result;
          })
          .catch((err) => {
            const result = action.interceptor?.responseError ? action.interceptor.responseError(err) : Resource.handleError(err);
            if (error) error(result);
            return result;
          });

        resourceInstance.$promise = promise;
        resourceInstance.$resolved = false;

        promise.finally(() => {
          resourceInstance.$resolved = true;
        });

        return resourceInstance;
      };

      resourceInstance[`$${actionName}`] = (params: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
        return resourceInstance[actionName](params, {}, success, error).$promise;
      };
    });

    return resourceInstance;
  }
}

export default Resource;