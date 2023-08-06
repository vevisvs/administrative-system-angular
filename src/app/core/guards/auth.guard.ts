import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const as = inject(AuthService);

  return as.isAuth().pipe(
    map((isAuth) => {
      if (isAuth) return true;
      return router.createUrlTree(['/authentication/login']);
    })
  );
};

