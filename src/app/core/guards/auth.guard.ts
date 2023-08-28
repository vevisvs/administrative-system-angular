import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const as = inject(AuthService);
  const userType = as.getUserType();

  return as.isAuth(userType).pipe(
    map((isAuth) => {
      console.log("auth:", isAuth)
      if (isAuth) return true;
      return router.createUrlTree(['/authentication/login']);
    })
  );
};



