import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, ResourceAction>;
}

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
    let finalUrl = url || this.template;
    const urlParams = this.urlParams;

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
        finalUrl = finalUrl.replace(new RegExp(`:${key}(\\W|$)`, 'g'), (match, p1) => `${encodedValue}${p1}`);
      } else {
        finalUrl = finalUrl.replace(new RegExp(`(/?):${key}(\\W|$)`, 'g'), (match, leadingSlash, tail) => (tail.charAt(0) === '/' ? tail : leadingSlash + tail));
      }
    });

    if (this.defaults.stripTrailingSlashes) {
      finalUrl = finalUrl.replace(/\/+$/, '') || '/';
    }

    finalUrl = finalUrl.replace(/\/\.(?=\w+($|\?))/, '.');
    config.url = finalUrl.replace(/\/\\\./, '/.');

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

  public bind(additionalOptions: ResourceOptions) {
    return new Resource(this.template, { ...this.defaults, ...additionalOptions });
  }

  public createInstance(data: any): ResourceInstance {
    const instance: ResourceInstance = { ...data };
    instance.toJSON = function () {
      const copy = { ...this };
      delete copy.$promise;
      delete copy.$resolved;
      return copy;
    };
    return instance;
  }

  public executeAction(actionName: string, params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void): Promise<any> {
    const action = this.defaults.actions![actionName];
    const config: AxiosRequestConfig = {
      method: action.method,
      params: {},
      data: {},
    };

    if (action.method === 'POST' || action.method === 'PUT' || action.method === 'PATCH') {
      config.data = data;
    }

    this.setUrlParams(config, params, action.url);

    const promise = axios(config)
      .then((response) => {
        const responseData = response.data;
        if (action.isArray) {
          if (!Array.isArray(responseData)) {
            throw new Error(`Expected array but got ${typeof responseData}`);
          }
          return responseData.map((item) => this.createInstance(item));
        } else {
          const instance = this.createInstance(responseData);
          instance.$resolved = true;
          return instance;
        }
      })
      .then((result) => {
        if (action.interceptor && action.interceptor.response) {
          return action.interceptor.response(result);
        }
        return result;
      })
      .catch((err) => {
        if (action.interceptor && action.interceptor.responseError) {
          return action.interceptor.responseError(err);
        }
        if (error) {
          error(err);
        }
        return Promise.reject(err);
      });

    if (success) {
      promise.then(success);
    }

    return promise;
  }
}

export default Resource;