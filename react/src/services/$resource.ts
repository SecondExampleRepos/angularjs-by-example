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
  $promise: Promise<any>;
  $resolved: boolean;
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

  public createAction(actionOptions: ActionOptions) {
    const isPostOrPutOrPatch = /^(POST|PUT|PATCH)$/i.test(actionOptions.method);

    return (data?: any, params?: any, success?: (value: any) => void, error?: (reason: any) => void) => {
      const config: AxiosRequestConfig = { method: actionOptions.method };
      const instance: ResourceInstance = {
        $promise: Promise.resolve(),
        $resolved: false,
      };

      if (isPostOrPutOrPatch) {
        config.data = data;
      } else {
        params = data;
      }

      this.setUrlParams(config, { ...params, ...actionOptions.params }, actionOptions.url);

      instance.$promise = axios(config)
        .then((response) => {
          const responseData = response.data;
          if (actionOptions.isArray) {
            if (!Array.isArray(responseData)) {
              throw new Error(`Expected array but got ${typeof responseData}`);
            }
            instance.length = 0;
            responseData.forEach((item: any) => {
              instance.push(item);
            });
          } else {
            Resource.copyData(responseData, instance);
          }
          instance.$resolved = true;
          if (actionOptions.interceptor?.response) {
            return actionOptions.interceptor.response(response);
          }
          return response;
        })
        .catch((err) => {
          instance.$resolved = true;
          if (actionOptions.interceptor?.responseError) {
            return actionOptions.interceptor.responseError(err);
          }
          return Promise.reject(err);
        });

      if (success) {
        instance.$promise.then(success);
      }
      if (error) {
        instance.$promise.catch(error);
      }

      return instance;
    };
  }
}

export default Resource;