import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip the interceptor if the X-Skip-Interceptor header is present
  if (req.headers.has('X-Skip-Interceptor')) {
    return next(req);
  }

  console.log('✅ Interceptor triggered');
  console.log('Original request headers:', req.headers);

  let token = localStorage.getItem('accessToken');
  if (!token) {
    token = localStorage.getItem('refreshToken');
  }

  let setHeaders: Record<string, string> = {};
  
  // For FormData requests, don't set any Content-Type or Accept headers
  // Let the browser handle it automatically
  if (!(req.body instanceof FormData)) {
    setHeaders['Content-Type'] = 'application/json';
    setHeaders['Accept'] = 'application/json';
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
