import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const user = auth.userSub.value;

  if (user) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
