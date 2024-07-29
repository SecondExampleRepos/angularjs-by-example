import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

class ShowService {
    static async makeRequest(url: string, params: Record<string, any>) {
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
            this.dataServiceError(error);
        }
    }

    static async getPremieres() {
        const date = new Date();
        date.setDate(1);
        const formattedDate = moment(date).format('DD-MM-YYYY');
        const data = await this.makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
        return data.results;
    }

    static async get(id: string) {
        return this.makeRequest(`tv/${id}`, {});
    }

    static async getCast(id: string) {
        return this.makeRequest(`tv/${id}/credits`, {});
    }

    static async search(query: string) {
        const data = await this.makeRequest('search/tv', { query });
        return data.results;
    }

    static async getPopular() {
        const data = await this.makeRequest('tv/popular', {});
        return data.results;
    }

    static dataServiceError(error: any) {
        console.error('XHR Failed for ShowService');
        console.error(error);
        return error;
    }
}

export default ShowService;
