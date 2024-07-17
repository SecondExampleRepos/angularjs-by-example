// react/src/routes/configs.ts

import { AxiosResponse } from 'axios';
import { PageValues } from '../utils/constants/PageValues';

const interceptor = (error: (response: AxiosResponse) => Promise<AxiosResponse>, success: (response: AxiosResponse) => AxiosResponse) => {
    return (promise: Promise<AxiosResponse>) => {
        return promise.then(success, error);
    };
};

const error = (response: AxiosResponse): Promise<AxiosResponse> => {
    if (response.status === 401) {
        console.error('You are unauthorised to access the requested resource (401)');
    } else if (response.status === 404) {
        console.error('The requested resource could not be found (404)');
    } else if (response.status === 500) {
        console.error('Internal server error (500)');
    }
    return Promise.reject(response);
};

const success = (response: AxiosResponse): AxiosResponse => {
    // Request completed successfully
    return response;
};

export const configs = {
    interceptor: interceptor(error, success)
};
