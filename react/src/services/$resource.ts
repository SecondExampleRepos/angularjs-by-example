import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, ActionOptions>;
}

interface ActionOptions {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  url?: string;
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

const setUrlParams = (url: string, params: Record<string, any>, stripTrailingSlashes: boolean): string => {
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    const value = encodeURIComponent(params[key]);
    finalUrl = finalUrl.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${value}$1`);
  });

  if (stripTrailingSlashes) {
    finalUrl = finalUrl.replace(/\/+$/, '') || '/';
  }

  return finalUrl;
};

const resourceFactory = (url: string, options: ResourceOptions = {}): any => {
  const finalOptions = { ...defaultOptions, ...options };

  const Resource = function (data: any) {
    Object.assign(this, data);
  };

  Object.keys(finalOptions.actions).forEach((actionName) => {
    const action = finalOptions.actions![actionName];

    Resource[actionName] = function (params: any = {}, data: any = {}): ResourceInstance {
      const config: AxiosRequestConfig = {
        method: action.method,
        url: setUrlParams(action.url || url, params, finalOptions.stripTrailingSlashes!),
        data,
      };

      const instance: ResourceInstance = new Resource(data);
      instance.$resolved = false;

      const promise = axios(config)
        .then((response) => {
          const responseData = response.data;
          if (action.isArray) {
            instance.length = 0;
            responseData.forEach((item: any) => instance.push(new Resource(item)));
          } else {
            Object.assign(instance, responseData);
          }
          instance.$resolved = true;
          return response;
        })
        .catch((error) => {
          instance.$resolved = true;
          return Promise.reject(error);
        });

      instance.$promise = promise;
      return instance;
    };

    Resource.prototype[`$${actionName}`] = function (params: any = {}, data: any = {}): Promise<any> {
      return Resource[actionName](params, data).$promise!;
    };
  });

  return Resource;
};

export default resourceFactory;