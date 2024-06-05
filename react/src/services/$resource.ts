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

const defaultActions: ResourceActions = {
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET', isArray: true },
  remove: { method: 'DELETE' },
  delete: { method: 'DELETE' },
};

const defaultOptions: ResourceDefaults = {
  stripTrailingSlashes: true,
  actions: defaultActions,
};

class Resource {
  private template: string;
  private defaults: ResourceDefaults;
  private urlParams: Record<string, boolean>;

  constructor(template: string, options: ResourceOptions = {}) {
    this.template = template;
    this.defaults = { ...defaultOptions, ...options };
    this.urlParams = {};
  }

  private setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url: string) {
    let finalUrl = url || this.template;
    const urlParams: Record<string, boolean> = {};

    finalUrl.split(/\W/).forEach((param) => {
      if (param && !/^\d+$/.test(param) && new RegExp(`(^|[^\\\\]):${param}(\\W|$)`).test(finalUrl)) {
        urlParams[param] = true;
      }
    });

    finalUrl = finalUrl.replace(/\\:/g, ':');

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
        finalUrl = finalUrl.replace(new RegExp(`(/?):${param}(\\W|$)`, 'g'), (match, leadingSlash, tail) => (tail.charAt(0) === '/' ? tail : leadingSlash + tail));
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

  private static handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private static handleError(error: any) {
    return Promise.reject(error);
  }

  public createActions(actions: ResourceActions) {
    const resource: any = {};

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      resource[actionName] = (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) => {
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

        const resourceInstance: ResourceInstance = isPostOrPutOrPatch ? data : {};
        resourceInstance.$promise = promise;
        resourceInstance.$resolved = false;

        promise.finally(() => {
          resourceInstance.$resolved = true;
        });

        return resourceInstance;
      };

      resource[`$${actionName}`] = function (params: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
        return resource[actionName](params, this, success, error).$promise;
      };
    });

    return resource;
  }
}

export default Resource;