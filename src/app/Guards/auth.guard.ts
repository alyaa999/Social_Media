import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // Optionally, add more validation for token expiration here
    return true;
  } else {
    // Only allow access to the login page
    if (state.url === '/login') {
      return true;
    }
    // Redirect to login page
    window.location.href = '/login';
    return false;
  }
};
