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
  template: string;
  defaults: ResourceOptions;
  urlParams: Record<string, boolean>;

  constructor(template: string, options: ResourceOptions = {}) {
    this.template = template;
    this.defaults = { ...defaultOptions, ...options };
    this.urlParams = {};
  }

  setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url: string) {
    let finalUrl = url || this.template;
    const urlParams: Record<string, boolean> = {};

    finalUrl.split(/\W/).forEach((param) => {
      if (param === 'hasOwnProperty') {
        throw new Error(`Invalid parameter name: ${param}`);
      }
      if (!/^\d+$/.test(param) && param) {
        const regex = new RegExp(`(^|[^\\\\]):${param}(\\W|$)`);
        if (regex.test(finalUrl)) {
          urlParams[param] = true;
        }
      }
    });

    finalUrl = finalUrl.replace(/\\:/g, ':');
    params = params || {};

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

  createResourceMethod(action: ResourceAction) {
    return (data?: any, params?: any, success?: (value: any) => void, error?: (reason: any) => void) => {
      const config: AxiosRequestConfig = {
        method: action.method,
        url: '',
        params: {},
        data: {},
      };

      if (action.method === 'POST' || action.method === 'PUT' || action.method === 'PATCH') {
        config.data = data;
      } else {
        config.params = data;
      }

      this.setUrlParams(config, params, action.url);

      const promise = axios(config)
        .then((response) => {
          const result = action.interceptor?.response ? action.interceptor.response(response) : response.data;
          if (success) success(result);
          return result;
        })
        .catch((err) => {
          if (error) error(err);
          return Promise.reject(err);
        });

      const resourceInstance: ResourceInstance = action.isArray ? [] : {};
      resourceInstance.$promise = promise;
      resourceInstance.$resolved = false;

      promise.finally(() => {
        resourceInstance.$resolved = true;
      });

      return resourceInstance;
    };
  }

  bind(additionalOptions: ResourceOptions) {
    return new Resource(this.template, { ...this.defaults, ...additionalOptions });
  }
}

export default Resource;