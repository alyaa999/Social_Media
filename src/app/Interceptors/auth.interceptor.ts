import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('✅ Interceptor triggered');
  console.log('Original request headers:', req.headers);

  let token = localStorage.getItem('accessToken');
  if (!token) {
    token = localStorage.getItem('refreshToken');
  }

  let setHeaders: Record<string, string> = {};
  
  // Only set Content-Type to application/json if it's not a FormData request
  if (!(req.body instanceof FormData)) {
    setHeaders['Content-Type'] = 'application/json';
  }

  if (token) {
    setHeaders['Authorization'] = `Bearer ${token}`;
  }

  const modifiedReq = req.clone({
    setHeaders
  });

  console.log('Modified request headers:', modifiedReq.headers);
  return next(modifiedReq);
};
