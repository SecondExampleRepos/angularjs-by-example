// Converted from src/app.config.js

import axios from 'axios';
import { useLocation } from 'react-router-dom';

type InterceptorResponse = {
    status: number;
};

const interceptor = (response: InterceptorResponse) => {
    if (response.status === 401) {
        console.error('You are unauthorised to access the requested resource (401)');
    } else if (response.status === 404) {
        console.error('The requested resource could not be found (404)');
    } else if (response.status === 500) {
        console.error('Internal server error (500)');
    }
    return Promise.reject(response);
};

const success = (response: any) => {
    // Request completed successfully
    return response;
};

axios.interceptors.response.use(success, interceptor);

export default function useConfigs() {
    const location = useLocation();
    // Additional logic can be added here if needed
}
