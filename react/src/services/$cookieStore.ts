// react/src/services/$cookieStore.ts

import { useState } from 'react';

// Utility functions to handle JSON conversion
const fromJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('Error parsing JSON', e);
    return null;
  }
};

const toJson = (obj: any) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    console.error('Error stringifying JSON', e);
    return null;
  }
};

// Custom hook to manage cookies
const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  const getCookie = (name: string) => {
    return cookies[name] ? fromJson(cookies[name]) : null;
  };

  const setCookie = (name: string, value: any) => {
    const jsonValue = toJson(value);
    if (jsonValue) {
      setCookies((prevCookies) => ({
        ...prevCookies,
        [name]: jsonValue,
      }));
    }
  };

  const removeCookie = (name: string) => {
    setCookies((prevCookies) => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    get: getCookie,
    put: setCookie,
    remove: removeCookie,
  };
};

export default useCookies;
