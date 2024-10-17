// Converted from src/services/show.fct.js

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_KEY = '87de9079e74c828116acce677f6f255b';
  private readonly BASE_URL = 'http://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private makeRequest(url: string, params: any) {
    let requestUrl = `${this.BASE_URL}/${url}?api_key=${this.API_KEY}`;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        requestUrl += `&${key}=${params[key]}`;
      }
    }
    return this.http.get(requestUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.dataServiceError)
    );
  }

  getPremieres() {
    const date = new Date();
    date.setDate(1);
    return this.makeRequest('discover/tv', {
      'first_air_date.gte': moment(date).format('DD-MM-YYYY'),
      append_to_response: 'genres'
    }).toPromise().then((data: any) => data.results);
  }

  get(id: string) {
    return this.makeRequest(`tv/${id}`, {}).toPromise();
  }

  getCast(id: string) {
    return this.makeRequest(`tv/${id}/credits`, {}).toPromise();
  }

  search(query: string) {
    return this.makeRequest('search/tv', { query }).toPromise().then((data: any) => data.results);
  }

  getPopular() {
    return this.makeRequest('tv/popular', {}).toPromise().then((data: any) => data.results);
  }

  private dataServiceError(errorResponse: any) {
    console.error('XHR Failed for ShowService');
    console.error(errorResponse);
    return of(errorResponse);
  }
}
