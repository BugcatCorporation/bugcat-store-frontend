import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  
  let currentUser = authService.currentUserValue;

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${currentUser?.token}`
    }
  })

  return next(req);
};
