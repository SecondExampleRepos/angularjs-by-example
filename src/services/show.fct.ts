'use strict';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_KEY = '87de9079e74c828116acce677f6f255b';
  private readonly BASE_URL = 'http://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private makeRequest(url: string, params: any): Observable<any> {
    let requestUrl = `${this.BASE_URL}/${url}?api_key=${this.API_KEY}`;
    Object.keys(params).forEach(key => {
      requestUrl += `&${key}=${params[key]}`;
    });
    return this.http.get(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      map(response => response.body),
      catchError(this.dataServiceError)
    );
  }

  getPremieres(): Observable<any> {
    const date = new Date();
    date.setDate(1);
    return this.makeRequest('discover/tv', {'first_air_date.gte': moment(date).format('DD-MM-YYYY'), append_to_response: 'genres'}).pipe(
      map(data => data.results)
    );
  }

  get(id: number): Observable<any> {
    return this.makeRequest(`tv/${id}`, {});
  }

  getCast(id: number): Observable<any> {
    return this.makeRequest(`tv/${id}/credits`, {});
  }

  search(query: string): Observable<any> {
    return this.makeRequest('search/tv', {query: query}).pipe(
      map(data => data.results)
    );
  }

  getPopular(): Observable<any> {
    return this.makeRequest('tv/popular', {}).pipe(
      map(data => data.results)
    );
  }

  private dataServiceError(error: any): Observable<any> {
    console.error('XHR Failed for ShowService');
    console.error(error);
    return Observable.throw(error);
  }
}
```