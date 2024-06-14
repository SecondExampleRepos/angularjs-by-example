import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const ShowService = {
    getPremieres: async () => {
        // Get first day of the current month
        const date = new Date();
        date.setDate(1);
        const formattedDate = moment(date).format('DD-MM-YYYY');
        const params = {
            'first_air_date.gte': formattedDate,
            'append_to_response': 'genres'
        };
        const data = await makeRequest('discover/tv', params);
        return data.results;
    },
    get: async (id: string) => {
        return await makeRequest(`tv/${id}`, {});
    },
    search: async (query: string) => {
        const data = await makeRequest('search/tv', { query });
        return data.results;
    },
    getPopular: async () => {
        const data = await makeRequest('tv/popular', {});
        return data.results;
    },
    getCast: async (id: string) => {
        return await makeRequest(`tv/${id}/credits`, {});
    }
};

async function makeRequest(url: string, params: Record<string, any>) {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${requestUrl}&${queryString}`;

    try {
        const response = await axios.get(fullUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'force-cache'
        });
        return response.data;
    } catch (error) {
        console.error('XHR Failed for ShowService', error);
        throw error;
    }
}

export default ShowService;