import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = `${environment.apiBaseUrl}/Baskets`;

  constructor(private http: HttpClient) { }

  // GET example
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST examples
  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }
}