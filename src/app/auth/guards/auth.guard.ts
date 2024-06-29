import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.esAutenticado()){
    return true;
  }

  // if(authService.isLogged()){
  //   const currentUser = sessionStorage.getItem("Usuario");

  //   if(currentUser === "Aguero"){
  //     return true;
  //   } else {
  //     router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
  //     return false;
  //   }

  // }

  router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
  return false;
};
