import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Post } from '../Interfaces/feed/post';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly USER_ID = '12';
  private readonly headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json")
    .set("userId", this.USER_ID);

  private baseUrl = `${environment.apiBaseUrl}/api/public/feeds/`;

  constructor(private _http: HttpClient) { }

  getTimeline(): Observable<Post[]> {
    console.log('Making request to:', `${this.baseUrl}timeline/12`);
    console.log('With headers:', this.headers);
    
    return this._http.get<Post[]>(`${this.baseUrl}timeline/12`, {
      headers: this.headers
    }).pipe(
      tap((response: Post[]) => {
        console.log('Raw API Response:', response);
      })
    );
  }

  private createHeader(userId: string): HttpHeaders {
    return new HttpHeaders()
      .set("Authorization", environment.token)
      .set("Accept", "application/json")
      .set("userId", userId);
  }

  GetTimeline(userId: string): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.baseUrl}timeline/${userId}`, {
      headers: this.createHeader(userId)
    });
  }
}
