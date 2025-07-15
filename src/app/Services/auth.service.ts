import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { LoginRequest } from '../Interfaces/Auth/LoginRequest';
import { LoginResponse } from '../Interfaces/Auth/LoginResponse';
import { RegisterRequest } from '../Interfaces/Auth/RegisterRequest';
import { RefreshRequest } from '../Interfaces/Auth/RefreshRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    const url = environment.apiBaseUrl + 'auth/login';
    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response: LoginResponse) => {
        if (response.accessToken) {
          this.setToken(response.accessToken);
        }
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Unauthorized'));
        }
        return throwError(() => error);
      })
    );
  }

  register(body: RegisterRequest): Observable<void> {
    const url = environment.apiBaseUrl + 'auth/register';
    return this.http.post<void>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          if (error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            const errorMessages = Object.values(validationErrors).flat();
            if (errorMessages.length > 0) {
              return throwError(() => new Error(errorMessages.join('\n')));
            }
          }
          return throwError(() => new Error('Bad Request: Please check your input.'));
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

  refresh(refreshRequest: RefreshRequest): Observable<LoginResponse> {
  const url = environment.apiBaseUrl + 'auth/refresh';
  return this.http.post<LoginResponse>(url, refreshRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Refresh token request failed:', error);
      return throwError(() => error);
    })
  );
}

}
