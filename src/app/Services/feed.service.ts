import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Post } from '../Interfaces/feed/post';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private baseUrl = `${environment.apiBaseUrl}feed`;

  constructor(private _http: HttpClient) { }

  getTimeline(): Observable<Post[]> {

    return this._http.get<Post[]>(`${this.baseUrl}`, {
    }).pipe(
      tap((response: Post[]) => {
        console.log('Raw API Response:', response);
      })
    );
  }
}
