// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

// Utility function to copy objects
const copy = (source: any, destination: any) => {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      destination[key] = source[key];
    }
  }
};

// Utility function to check if a value is undefined
const isUndefined = (value: any) => typeof value === 'undefined';

// Custom hook to manage cookies
const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [prevCookies, setPrevCookies] = useState<{ [key: string]: string }>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const pollCookies = () => {
      const currentCookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: string });

      if (JSON.stringify(prevCookies) !== JSON.stringify(currentCookies)) {
        setPrevCookies(currentCookies);
        setCookies(currentCookies);
        if (initialized) {
          // Trigger re-render
          setInitialized(false);
          setInitialized(true);
        }
      }
    };

    const intervalId = setInterval(pollCookies, 1000);
    setInitialized(true);

    return () => clearInterval(intervalId);
  }, [prevCookies, initialized]);

  useEffect(() => {
    if (initialized) {
      for (const key in prevCookies) {
        if (isUndefined(cookies[key])) {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      }

      for (const key in cookies) {
        const value = cookies[key];
        if (typeof value !== 'string') {
          cookies[key] = `${value}`;
        }
        if (prevCookies[key] !== cookies[key]) {
          document.cookie = `${key}=${cookies[key]}`;
        }
      }
    }
  }, [cookies, prevCookies, initialized]);

  return {
    cookies,
    setCookie: (key: string, value: string) => {
      setCookies(prev => ({ ...prev, [key]: value }));
    },
    removeCookie: (key: string) => {
      setCookies(prev => {
        const newCookies = { ...prev };
        delete newCookies[key];
        return newCookies;
      });
    }
  };
};

export default useCookies;