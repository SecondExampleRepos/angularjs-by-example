import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const ShowService = {
    getPremieres: async () => {
        try {
            // Get first day of the current month
            const date = new Date();
            date.setDate(1);
            const formattedDate = moment(date).format('DD-MM-YYYY');
            const response = await makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
            return response.results;
        } catch (error) {
            handleServiceError(error);
        }
    },
    get: async (id: string) => {
        try {
            return await makeRequest(`tv/${id}`, {});
        } catch (error) {
            handleServiceError(error);
        }
    },
    getCast: async (id: string) => {
        try {
            return await makeRequest(`tv/${id}/credits`, {});
        } catch (error) {
            handleServiceError(error);
        }
    },
    search: async (query: string) => {
        try {
            const response = await makeRequest('search/tv', { query });
            return response.results;
        } catch (error) {
            handleServiceError(error);
        }
    },
    getPopular: async () => {
        try {
            const response = await makeRequest('tv/popular', {});
            return response.results;
        } catch (error) {
            handleServiceError(error);
        }
    }
};

async function makeRequest(url: string, params: Record<string, any>) {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${requestUrl}&${queryParams}`;

    try {
        const response = await axios.get(fullUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

function handleServiceError(error: any) {
    console.error('XHR Failed for ShowService');
    console.error(error);
    return error;
}

export default ShowService;