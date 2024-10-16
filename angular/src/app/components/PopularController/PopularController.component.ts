// show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_KEY = '87de9079e74c828116acce677f6f255b';
  private readonly BASE_URL = 'http://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopular(): Promise<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/tv/popular?api_key=${this.API_KEY}`)
      .pipe(map(response => response.results))
      .toPromise();
  }
}
