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

const defaultActions: ResourceActions = {
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET', isArray: true },
  remove: { method: 'DELETE' },
  delete: { method: 'DELETE' },
};

const defaultOptions: ResourceOptions = {
  stripTrailingSlashes: true,
  actions: defaultActions,
};

function extend(target: any, ...sources: any[]): any {
  sources.forEach(source => {
    if (source) {
      Object.keys(source).forEach(key => {
        target[key] = source[key];
      });
    }
  });
  return target;
}

function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

function setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, template: string): void {
  let url = template;
  Object.keys(params).forEach(key => {
    const value = encodeURIComponent(params[key]);
    url = url.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${value}$1`);
  });
  config.url = url;
}

class Resource {
  private template: string;
  private defaults: ResourceOptions;
  private urlParams: Record<string, boolean>;

  constructor(template: string, options: ResourceOptions = {}) {
    this.template = template;
    this.defaults = extend({}, defaultOptions, options);
    this.urlParams = {};
  }

  private createResourceMethod(action: ResourceAction) {
    return (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
      const config: AxiosRequestConfig = {
        method: action.method,
        url: this.template,
        params: {},
        data: {},
      };

      if (action.params) {
        extend(config.params, action.params, params);
      }

      if (action.url) {
        setUrlParams(config, params, action.url);
      }

      if (action.method === 'POST' || action.method === 'PUT' || action.method === 'PATCH') {
        config.data = data;
      }

      const promise = axios(config)
        .then(response => {
          const result = action.isArray ? response.data.map((item: any) => new ResourceInstance(item)) : new ResourceInstance(response.data);
          if (success) success(result);
          return result;
        })
        .catch(err => {
          if (error) error(err);
          return Promise.reject(err);
        });

      return promise;
    };
  }

  public bind(additionalParams: Record<string, any>) {
    const newResource = new Resource(this.template, extend({}, this.defaults, { params: additionalParams }));
    return newResource;
  }
}

class ResourceInstance implements ResourceInstance {
  constructor(data: any) {
    extend(this, data);
  }

  toJSON() {
    const data = extend({}, this);
    delete data.$promise;
    delete data.$resolved;
    return data;
  }
}

export default Resource;