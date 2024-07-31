import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the interceptor functions
const errorInterceptor = (error: any): Promise<any> => {
    if (error.response.status === 401) {
        console.error('You are unauthorised to access the requested resource (401)');
    } else if (error.response.status === 404) {
        console.error('The requested resource could not be found (404)');
    } else if (error.response.status === 500) {
        console.error('Internal server error (500)');
    }
    return Promise.reject(error);
};

const successInterceptor = (response: AxiosResponse): AxiosResponse => {
    // Request completed successfully
    return response;
};

// Apply the interceptors to axios
axios.interceptors.response.use(successInterceptor, errorInterceptor);
