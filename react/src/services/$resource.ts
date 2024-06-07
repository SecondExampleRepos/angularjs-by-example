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

interface ResourceConfig {
  url: string;
  params?: Record<string, any>;
  data?: any;
}

class Resource {
  private template: string;
  private defaults: ResourceDefaults;
  private urlParams: Record<string, boolean>;

  constructor(template: string, defaults: ResourceDefaults) {
    this.template = template;
    this.defaults = defaults;
    this.urlParams = {};
  }

  private setUrlParams(config: ResourceConfig, params: Record<string, any>, url: string) {
    let finalUrl = url || this.template;
    const urlParams: Record<string, boolean> = {};

    finalUrl.split(/\W/).forEach(param => {
      if (param && !/^\d+$/.test(param) && new RegExp(`(^|[^\\\\]):${param}(\\W|$)`).test(finalUrl)) {
        urlParams[param] = true;
      }
    });

    finalUrl = finalUrl.replace(/\\:/g, ':');
    params = params || {};

    Object.keys(urlParams).forEach(param => {
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
    Object.keys(params).forEach(param => {
      if (!urlParams[param]) {
        config.params = config.params || {};
        config.params[param] = params[param];
      }
    });
  }

  public createResource(actions: ResourceActions) {
    const resource: any = {};

    Object.keys(actions).forEach(actionName => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resource[actionName] = (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
        const config: AxiosRequestConfig = {
          method: action.method,
          url: '',
          params: {},
          data: isPostOrPutOrPatch ? data : undefined,
        };

        this.setUrlParams(config, { ...params, ...action.params }, action.url);

        const request = axios(config)
          .then(response => {
            const responseData = action.interceptor?.response ? action.interceptor.response(response) : response.data;
            if (success) success(responseData);
            return responseData;
          })
          .catch(err => {
            const errorData = action.interceptor?.responseError ? action.interceptor.responseError(err) : err;
            if (error) error(errorData);
            return Promise.reject(errorData);
          });

        return request;
      };

      resource[`$${actionName}`] = function (params: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
        return resource[actionName](params, this, success, error);
      };
    });

    resource.bind = (additionalParams: any) => {
      return this.createResource({ ...actions, ...additionalParams });
    };

    return resource;
  }
}

const defaultActions: ResourceActions = {
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET', isArray: true },
  remove: { method: 'DELETE' },
  delete: { method: 'DELETE' },
};

const resourceDefaults: ResourceDefaults = {
  stripTrailingSlashes: true,
  actions: defaultActions,
};

const createResourceService = (template: string, customActions: ResourceActions = {}) => {
  const resource = new Resource(template, resourceDefaults);
  return resource.createResource({ ...defaultActions, ...customActions });
};

export default createResourceService;