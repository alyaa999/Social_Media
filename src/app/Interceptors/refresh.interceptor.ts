import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { LoginResponse } from '../Interfaces/Auth/LoginResponse';

export const refreshInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          return authService.refresh({ refreshToken }).pipe(
            switchMap((response: LoginResponse) => {
              localStorage.setItem('accessToken', response.accessToken);
              if (response.refreshToken) {
                localStorage.setItem('refreshToken', response.refreshToken);
              }
              // As requested, reload the page.
              window.location.reload();
              // The stream will be interrupted by the reload, so we don't need to return anything meaningful here.
              // Returning an empty observable to satisfy the type signature.
              return new Observable<HttpEvent<any>>();
            }),
            catchError((refreshError) => {
              // If refresh fails, clear tokens and redirect to login
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              // You might want to navigate to the login page here
              // inject(Router).navigate(['/login']);
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
