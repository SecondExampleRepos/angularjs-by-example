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
      },
      ...options,
    };
    this.urlParams = {};
  }

  private setUrlParams(config: AxiosRequestConfig, params: Record<string, any>, url: string) {
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
        finalUrl = finalUrl.replace(new RegExp(`(/?):${key}(\\W|$)`, 'g'), (match, leadingSlash, trailingPart) => (trailingPart.charAt(0) === '/' ? trailingPart : leadingSlash + trailingPart));
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
      if (source.hasOwnProperty(key) && key.charAt(0) !== '$' && key.charAt(1) !== '$') {
        destination[key] = source[key];
      }
    });
  }

  private static handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private static handleError(error: any) {
    return Promise.reject(error);
  }

  public createResource(url: string, paramDefaults: Record<string, any> = {}, actions: Record<string, ActionOptions> = {}) {
    const resource = new Resource(url, { actions });

    const ResourceClass = function (this: ResourceInstance, data: any) {
      if (data) {
        Resource.copyData(data, this);
      }
    } as any;

    Object.keys(actions).forEach((actionName) => {
      const action = actions[actionName];
      const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(action.method);

      ResourceClass[actionName] = function (params: any = {}, data: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
        const config: AxiosRequestConfig = {
          method: action.method,
          ...action,
        };

        if (isPostOrPutOrPatch) {
          config.data = data;
        } else {
          config.params = params;
        }

        resource.setUrlParams(config, { ...paramDefaults, ...params }, action.url);

        const promise = axios(config)
          .then((response) => {
            const responseData = action.interceptor?.response ? action.interceptor.response(response) : Resource.handleResponse(response);
            if (success) success(responseData);
            return responseData;
          })
          .catch((err) => {
            const errorData = action.interceptor?.responseError ? action.interceptor.responseError(err) : Resource.handleError(err);
            if (error) error(errorData);
            return errorData;
          });

        const instance = new ResourceClass(data);
        instance.$promise = promise;
        instance.$resolved = false;

        promise.finally(() => {
          instance.$resolved = true;
        });

        return instance;
      };

      ResourceClass.prototype[`$${actionName}`] = function (params: any = {}, success?: (value: any) => void, error?: (reason: any) => void) {
        return ResourceClass[actionName].call(this, params, this, success, error).$promise;
      };
    });

    return ResourceClass;
  }
}

export default Resource;