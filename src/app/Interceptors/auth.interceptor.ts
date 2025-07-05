import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('✅ Interceptor triggered');
  console.log('Original request headers:', req.headers);

  let token = localStorage.getItem('accessToken');
  if (!token) {
    token = localStorage.getItem('refreshToken');
  }

  const setHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    setHeaders['Authorization'] = `Bearer ${token}`;
  }

  const modifiedReq = req.clone({
    setHeaders
  });

  console.log('Modified request headers:', modifiedReq.headers);
  return next(modifiedReq);
};
