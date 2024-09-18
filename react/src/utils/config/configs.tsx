// Converted from src/app.config.js

import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export function setupAxiosInterceptors() {
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            // Request completed successfully
            return response;
        },
        (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('You are unauthorised to access the requested resource (401)');
                        break;
                    case 404:
                        toast.error('The requested resource could not be found (404)');
                        break;
                    case 500:
                        toast.error('Internal server error (500)');
                        break;
                    default:
                        toast.error('An unexpected error occurred');
                }
            }
            return Promise.reject(error);
        }
    );
}
