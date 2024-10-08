// show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(`/api/shows/${id}`);
  }
}
