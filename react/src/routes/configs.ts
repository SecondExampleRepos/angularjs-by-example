// react/src/routes/configs.ts

import axios, { AxiosResponse, AxiosError } from 'axios';

const interceptor = (error: (error: AxiosError) => void, success: (response: AxiosResponse) => void) => {
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            return success(response);
        },
        (error: AxiosError) => {
            return error(error);
        }
    );
};

const error = (error: AxiosError) => {
    if (error.response?.status === 401) {
        console.error('You are unauthorised to access the requested resource (401)');
    } else if (error.response?.status === 404) {
        console.error('The requested resource could not be found (404)');
    } else if (error.response?.status === 500) {
        console.error('Internal server error (500)');
    }
    return Promise.reject(error);
};

const success = (response: AxiosResponse) => {
    // Request completed successfully
    return response;
};

interceptor(error, success);
