import { useState, useEffect } from 'react';

// Define the $cookies service
const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [prevCookies, setPrevCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const pollCookies = () => {
      const currentCookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      }, {} as { [key: string]: string });

      if (JSON.stringify(prevCookies) !== JSON.stringify(currentCookies)) {
        setPrevCookies(currentCookies);
        setCookies(currentCookies);
      }
    };

    const intervalId = setInterval(pollCookies, 1000);
    return () => clearInterval(intervalId);
  }, [prevCookies]);

  const getCookie = (name: string) => {
    return cookies[name] ? JSON.parse(cookies[name]) : undefined;
  };

  const setCookie = (name: string, value: any) => {
    const stringValue = JSON.stringify(value);
    document.cookie = `${name}=${stringValue}`;
    setCookies((prev) => ({ ...prev, [name]: stringValue }));
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookies((prev) => {
      const newCookies = { ...prev };
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