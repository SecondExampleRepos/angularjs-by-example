// react/src/services/$cookieStore.ts

// Import necessary modules
import { useState } from 'react';

// Define the $cookieStore service
export const useCookieStore = () => {
  // State to hold cookies
  const [cookies, setCookies] = useState<{ [key: string]: any }>({});

  // Function to get a cookie
  const get = (key: string) => {
    const cookie = cookies[key];
    return cookie ? JSON.parse(cookie) : null;
  };

  // Function to put a cookie
  const put = (key: string, value: any) => {
    const newCookies = { ...cookies, [key]: JSON.stringify(value) };
    setCookies(newCookies);
  };

  // Function to remove a cookie
  const remove = (key: string) => {
    const { [key]: _, ...newCookies } = cookies;
    setCookies(newCookies);
  };

  // Return the functions
  return {
    get,
    put,
    remove,
  };
};
