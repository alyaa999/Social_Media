import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroment/enviroment';
import { LoginRequest } from '../Interfaces/Auth/LoginRequest';
import { LoginResponse } from '../Interfaces/Auth/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(body: LoginRequest): Observable<LoginResponse> {
    const url = environment.apiBaseUrl + 'auth/login';
    return this.http.post<LoginResponse>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Unauthorized'));
        }
        return throwError(() => error);
      })
    );
  }

  verify(): Observable<{id : string}> {
    const url = environment.apiBaseUrl + 'auth/verify';
    return this.http.get<{id : string}>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Unauthorized'));
        }
        return throwError(() => error);
      })
    );
  }
}
