import { useState, useEffect } from 'react';

// Define the useCookies hook
const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [prevCookies, setPrevCookies] = useState<{ [key: string]: string }>({});

  // Function to update cookies
  const updateCookies = () => {
    const newCookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=').map(c => c.trim());
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    setPrevCookies(cookies);
    setCookies(newCookies);
  };

  // Function to set a cookie
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
    updateCookies();
  };

  // Function to remove a cookie
  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    updateCookies();
  };

  // Effect to poll for cookie changes
  useEffect(() => {
    const interval = setInterval(updateCookies, 1000);
    return () => clearInterval(interval);
  }, [cookies]);

  // Watch for changes in cookies and update state
  useEffect(() => {
    const handleCookiesChange = () => {
      const newCookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: string });

      setPrevCookies(cookies);
      setCookies(newCookies);
    };

    window.addEventListener('cookiechange', handleCookiesChange);
    return () => window.removeEventListener('cookiechange', handleCookiesChange);
  }, [cookies]);

  return {
    cookies,
    setCookie,
    removeCookie,
  };
};

export default useCookies;