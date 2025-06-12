import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('✅ Interceptor triggered');

  const modifiedReq = req.clone({
    setHeaders: {
    
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq);
};
