import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}api/public/feeds/`;

  constructor(private _http: HttpClient) { }
  private createHeader(userId: string) {
    return this.headers.set("userId", userId);
  }

  GetTimeline(userId: string) {
    return this._http.get(`${this.baseUrl}timeline/${userId}`, {
      headers: this.createHeader(userId)
    });

  }

}
