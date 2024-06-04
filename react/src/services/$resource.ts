// react/src/services/$resource.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, ResourceAction>;
}

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  interceptor?: {
    response?: (response: AxiosResponse) => any;
    responseError?: (error: any) => any;
  };
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

  private setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url: string) {
    const urlParams: Record<string, boolean> = {};
    const paramRegex = /(\W|^):(\w+)(\W|$)/g;
    let match: RegExpExecArray | null;

    while ((match = paramRegex.exec(url)) !== null) {
      urlParams[match[2]] = true;
    }

    url = url.replace(/\\:/g, ':');
    Object.keys(urlParams).forEach((key) => {
      const value = params[key] || this.defaults[key];
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
        url = url.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${encodedValue}$1`);
      } else {
        url = url.replace(new RegExp(`(/?):${key}(\\W|$)`, 'g'), (match, leadingSlash, tail) => (tail.charAt(0) === '/' ? tail : leadingSlash + tail));
      }
    });

    if (this.defaults.stripTrailingSlashes) {
      url = url.replace(/\/+$/, '') || '/';
    }

    config.url = url.replace(/\/\.(?=\w+($|\?))/, '.');
    Object.keys(params).forEach((key) => {
      if (!urlParams[key]) {
        config.params = config.params || {};
        config.params[key] = params[key];
      }
    });
  }

  private static copyData(source: any, destination: any) {
    Object.keys(source).forEach((key) => {
      if (key.charAt(0) !== '$' || key.charAt(1) !== '$') {
        destination[key] = source[key];
      }
    });
  }

  public createResource(actions: Record<string, ResourceAction> = {}) {
    const resourceActions = { ...this.defaults.actions, ...actions };
    const resourceInstance: ResourceInstance = {};

    Object.keys(resourceActions).forEach((actionName) => {
      const action = resourceActions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resourceInstance[actionName] = (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
        const config: AxiosRequestConfig = {
          method: action.method,
          url: this.template,
          params: {},
        };

        if (isPostOrPutOrPatch) {
          config.data = data;
        }

        this.setUrlParams(config, params, this.template);

        const promise = axios(config)
          .then((response) => {
            const responseData = response.data;
            if (action.isArray) {
              if (!Array.isArray(responseData)) {
                throw new Error(`Expected array but got ${typeof responseData}`);
              }
              return responseData.map((item: any) => new ResourceInstance(item));
            } else {
              Resource.copyData(responseData, resourceInstance);
              return resourceInstance;
            }
          })
          .then((result) => {
            if (action.interceptor?.response) {
              return action.interceptor.response(result);
            }
            return result;
          })
          .catch((err) => {
            if (action.interceptor?.responseError) {
              return action.interceptor.responseError(err);
            }
            return Promise.reject(err);
          });

        resourceInstance.$promise = promise;
        resourceInstance.$resolved = false;

        promise.then(
          (result) => {
            resourceInstance.$resolved = true;
            if (success) success(result);
          },
          (err) => {
            resourceInstance.$resolved = true;
            if (error) error(err);
          }
        );

        return resourceInstance;
      };

      resourceInstance[`$${actionName}`] = function (params: any, success?: (value: any) => void, error?: (reason: any) => void) {
        return resourceInstance[actionName](params, this, success, error).$promise;
      };
    });

    return resourceInstance;
  }
}

export default Resource;