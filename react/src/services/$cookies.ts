// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchCookies = () => {
      const browserCookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
      const browserCookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [name, value] = cookie.split('=').map(c => c.trim());
          if (name && value) {
            acc[name] = value;
          }
          return acc;
        }, {} as Cookies);
        setCookies(browserCookies);
      setCookies(browserCookies);
    };

    const updateCookies = () => {
setCookies(document.cookie.split('; ').reduce((acc, cookie) => {
  const [name, value] = cookie.split('=');
  acc[name] = decodeURIComponent(value);
  return acc;
}, {} as Cookies));
    };

    if (!initialized) {
      fetchCookies();
      setInitialized(true);
    }

document.cookie = `${name}=${value}; path=/`;
      updateCookies();
    }, 1000); // Polling interval

    return () => clearInterval(interval);
  }, [initialized]);

  const getCookie = (name: string): string | null => {
// Remove cookie from the browser
document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
  };

  const setCookie = (name: string, value: string): void => {
document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: value,
// Remove cookie from the browser
document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const removeCookie = (name: string): void => {
document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setCookies((prevCookies) => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
};

export default useCookies;