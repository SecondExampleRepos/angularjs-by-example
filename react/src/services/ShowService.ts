import axios from 'axios';
import moment from 'moment';
import { API_KEY, BASE_URL } from '../utils/constants';

class ShowService {
    async getPremieres() {
        const date = new Date();
        date.setDate(1);
        const formattedDate = moment(date).format('DD-MM-YYYY');
        const params = {
            'first_air_date.gte': formattedDate,
            append_to_response: 'genres',
            api_key: API_KEY
        };
        try {
            const response = await axios.get(`${BASE_URL}/discover/tv`, { params });
            return response.data.results;
        } catch (error) {
            this.handleError(error);
        }
    }

    async get(id: string) {
        try {
            const response = await axios.get(`${BASE_URL}/tv/${id}`, {
                params: { api_key: API_KEY }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getCast(id: string) {
        try {
            const response = await axios.get(`${BASE_URL}/tv/${id}/credits`, {
                params: { api_key: API_KEY }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async search(query: string) {
        try {
            const response = await axios.get(`${BASE_URL}/search/tv`, {
                params: { query, api_key: API_KEY }
            });
            return response.data.results;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getPopular() {
        try {
            const response = await axios.get(`${BASE_URL}/tv/popular`, {
                params: { api_key: API_KEY }
            });
            return response.data.results;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        console.error('XHR Failed for ShowService');
        console.error(error);
        return error;
    }
}

export default new ShowService();
