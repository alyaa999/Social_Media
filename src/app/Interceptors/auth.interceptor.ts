import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('✅ Interceptor triggered');
  console.log('Original request headers:', req.headers);

  // Only add Content-Type if it's not already set
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  console.log('Modified request headers:', modifiedReq.headers);
  return next(modifiedReq);
};
