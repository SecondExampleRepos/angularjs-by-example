// Import necessary modules
import { useState } from 'react';

// Define the $cookieStore service
const useCookieStore = () => {
  // State to hold cookies
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  // Function to get a cookie by name
  const get = (name: string): any => {
    const cookie = cookies[name];
    return cookie ? JSON.parse(cookie) : null;
  };

  // Function to set a cookie
  const put = (name: string, value: any): void => {
    const newCookies = { ...cookies, [name]: JSON.stringify(value) };
    setCookies(newCookies);
  };

  // Function to remove a cookie
  const remove = (name: string): void => {
    const { [name]: _, ...newCookies } = cookies;
    setCookies(newCookies);
  };

  // Return the functions to interact with cookies
  return {
    get,
    put,
    remove,
  };
};

export default useCookieStore;