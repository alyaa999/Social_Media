import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Example: you retrieve data from localStorage or another service
    const userId = '12345';
    const nextHashId = 'abcde-6789';

    // Clone request and add headers
    const modifiedReq = req.clone({
      setHeaders: {
        'UserId': userId,
        'BasketId': nextHashId,
        'Custom-Header': 'HelloWorld'
      }
    });

    return next.handle(modifiedReq);
  }
}
