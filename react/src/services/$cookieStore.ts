// react/src/services/$cookieStore.ts

import { useState, useEffect } from 'react';

// Custom hook to manage cookies
const useCookieStore = () => {
  const [cookies, setCookies] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Function to get all cookies
    const getCookies = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const cookieObject: { [key: string]: any } = {};
      cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObject[name] = value;
      });
      setCookies(cookieObject);
    };

    // Initialize cookies on mount
    getCookies();

    // Set up a polling mechanism to update cookies
    const intervalId = setInterval(getCookies, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to get a specific cookie
  const get = (name: string) => {
    return cookies[name] ? JSON.parse(cookies[name]) : null;
  };

  // Function to set a specific cookie
  const put = (name: string, value: any) => {
    document.cookie = `${name}=${JSON.stringify(value)}`;
    setCookies(prevCookies => ({
      ...prevCookies,
      [name]: JSON.stringify(value),
    }));
  };

  // Function to remove a specific cookie
  const remove = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const { [name]: _, ...rest } = cookies;
    setCookies(rest);
  };

  return {
    get,
    put,
    remove,
  };
};

export default useCookieStore;
