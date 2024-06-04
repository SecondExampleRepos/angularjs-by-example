import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const ShowService = {
    getPremieres,
    get,
    search,
    getPopular,
    getCast
};

async function makeRequest(url: string, params: Record<string, any>) {
    let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    Object.keys(params).forEach(key => {
        requestUrl += `&${key}=${params[key]}`;
    });

    try {
        const response = await axios.get(requestUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: true
        });
        return response.data;
    } catch (error) {
        return dataServiceError(error);
    }
}

async function getPremieres() {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const data = await makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
    return data.results;
}

async function get(id: string) {
    return await makeRequest(`tv/${id}`, {});
}

async function getCast(id: string) {
    return await makeRequest(`tv/${id}/credits`, {});
}

async function search(query: string) {
    const data = await makeRequest('search/tv', { query });
    return data.results;
}

async function getPopular() {
    const data = await makeRequest('tv/popular', {});
    return data.results;
}

function dataServiceError(error: any) {
    console.error('XHR Failed for ShowService');
    console.error(error);
    return error;
}

export default ShowService;