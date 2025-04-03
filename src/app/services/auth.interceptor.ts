import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../services/cookie.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService); // Inject the CookieService
  const token = cookieService.getCookie('authToken'); // Retrieve the token from the cookie

  // Clone the request and add the Authorization header if the token exists
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedRequest); // Pass the cloned or original request to the next handler
};