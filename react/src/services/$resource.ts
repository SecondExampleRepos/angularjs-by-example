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

function setUrlParams(url: string, params: Record<string, any>, stripTrailingSlashes: boolean): string {
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    const value = encodeURIComponent(params[key]);
    finalUrl = finalUrl.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${value}$1`);
  });

  if (stripTrailingSlashes) {
    finalUrl = finalUrl.replace(/\/+$/, '') || '/';
  }

  return finalUrl;
}

function createResource(url: string, options: ResourceOptions = defaultOptions) {
  const actions = options.actions || defaultActions;

  class Resource {
    [key: string]: any;

    constructor(data?: any) {
      if (data) {
        Object.assign(this, data);
      }
    }

    toJSON() {
      const data = { ...this };
      delete data.$promise;
      delete data.$resolved;
      return data;
    }
  }

  Object.keys(actions).forEach((actionName) => {
    const action = actions[actionName];
    const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

    Resource[actionName] = function (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
      const config: AxiosRequestConfig = {
        method: action.method,
        url: setUrlParams(action.url || url, params, options.stripTrailingSlashes || true),
        params: !isPostOrPutOrPatch ? params : undefined,
        data: isPostOrPutOrPatch ? data : undefined,
      };

      const instance = new Resource(data);
      instance.$resolved = false;

      const promise = axios(config)
        .then((response) => {
          const responseData = response.data;
          if (action.isArray) {
            instance.length = 0;
            responseData.forEach((item: any) => {
              instance.push(new Resource(item));
            });
          } else {
            Object.assign(instance, responseData);
          }
          instance.$resolved = true;
          if (action.interceptor?.response) {
            return action.interceptor.response(response);
          }
          return response;
        })
        .catch((err) => {
          instance.$resolved = true;
          if (action.interceptor?.responseError) {
            return action.interceptor.responseError(err);
          }
          return Promise.reject(err);
        });

      instance.$promise = promise;

      if (success) {
        promise.then(success);
      }
      if (error) {
        promise.catch(error);
      }

      return instance;
    };

    Resource.prototype[`$${actionName}`] = function (params: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
      return Resource[actionName].call(this, params, this, success, error).$promise;
    };
  });

  return Resource;
}

export default createResource;