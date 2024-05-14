import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

class ShowService {
    static async makeRequest(url: string, params: Record<string, any>): Promise<any> {
        let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
        Object.keys(params).forEach(key => {
            requestUrl += `&${key}=${encodeURIComponent(params[key])}`;
        });
        try {
            const response = await axios.get(requestUrl, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('XHR Failed for ShowService');
            console.error(error);
            throw error;
        }
    }

    static async getPremieres(): Promise<any> {
        const date = new Date();
        date.setDate(1);
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const data = await this.makeRequest('discover/tv', {'first_air_date.gte': formattedDate, append_to_response: 'genres'});
        return data.results;
    }

    static async get(id: string): Promise<any> {
        return this.makeRequest(`tv/${id}`, {});
    }

    static async getCast(id: string): Promise<any> {
        return this.makeRequest(`tv/${id}/credits`, {});
    }

    static async search(query: string): Promise<any> {
        const data = await this.makeRequest('search/tv', {query: query});
        return data.results;
    }

    static async getPopular(): Promise<any> {
        const data = await this.makeRequest('tv/popular', {});
        return data.results;
    }
}

export default ShowService;