import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}api/public/comment/`;

  constructor(private _http: HttpClient) {}

  private createHeader(userId: string){
    return this.headers.set("userId", userId);
  }

}
