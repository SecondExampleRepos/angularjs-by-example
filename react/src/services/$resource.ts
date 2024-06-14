import { useState, useEffect } from 'react';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, any>;
}

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  interceptor?: {
    response?: (response: any) => any;
    responseError?: (response: any) => any;
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

const useResource = (url: string, options: ResourceOptions = {}) => {
  const [resource, setResource] = useState<ResourceInstance | null>(null);

  const mergedOptions = { ...defaultOptions, ...options };

  const setUrlParams = (url: string, params: Record<string, any>) => {
    let finalUrl = url;
    Object.keys(params).forEach((key) => {
      const value = encodeURIComponent(params[key]);
      finalUrl = finalUrl.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${value}$1`);
    });
    if (mergedOptions.stripTrailingSlashes) {
      finalUrl = finalUrl.replace(/\/+$/, '') || '/';
    }
    return finalUrl;
  };

  const executeAction = async (action: ResourceAction, params: Record<string, any> = {}, data: any = null) => {
    const urlWithParams = setUrlParams(url, params);
    const config: RequestInit = {
      method: action.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(urlWithParams, config);
      const responseData = await response.json();
      if (action.isArray) {
        setResource(responseData);
      } else {
        setResource({ ...resource, ...responseData });
      }
      return responseData;
    } catch (error) {
      console.error('Error executing action:', error);
      throw error;
    }
  };

  const resourceActions: Record<string, any> = {};
  Object.keys(mergedOptions.actions || {}).forEach((actionName) => {
    const action = mergedOptions.actions![actionName];
    resourceActions[actionName] = (params: Record<string, any> = {}, data: any = null) => {
      return executeAction(action, params, data);
    };
  });

  return {
    resource,
    ...resourceActions,
  };
};

export default useResource;