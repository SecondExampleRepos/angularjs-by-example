// Converted from src/app.config.js

import axios from 'axios';
import { useLocation } from 'react-router-dom';

const interceptor = (error: any) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401) {
            console.error('You are unauthorised to access the requested resource (401)');
        } else if (status === 404) {
            console.error('The requested resource could not be found (404)');
        } else if (status === 500) {
            console.error('Internal server error (500)');
        }
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(
    response => response, // Request completed successfully
    interceptor
);

export default function useConfigs() {
    const location = useLocation();
    // Additional logic can be added here using `location` if needed
}
