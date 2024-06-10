// react/src/services/$cookieStore.ts

// Import necessary modules
import Cookies from 'js-cookie';

// Define the $cookieStore service
const $cookieStore = {
  get: (key: string): any => {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : value;
  },
  put: (key: string, value: any): void => {
    Cookies.set(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    Cookies.remove(key);
  }
};

export default $cookieStore;