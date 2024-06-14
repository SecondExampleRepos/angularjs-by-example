import { useState, useEffect } from 'react';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, any>;
}

interface ResourceAction {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  url?: string;
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

  const executeAction = async (action: ResourceAction, params: any = {}, data: any = {}) => {
    const urlWithParams = setUrlParams(url, params);
    const config: RequestInit = {
      method: action.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

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

  const resourceActions = Object.keys(mergedOptions.actions || {}).reduce((acc, actionName) => {
    const action = mergedOptions.actions![actionName];
    acc[actionName] = (params: any, data: any) => executeAction(action, params, data);
    return acc;
  }, {} as Record<string, (params: any, data: any) => Promise<any>>);

  return {
    resource,
    ...resourceActions,
  };
};

export default useResource;