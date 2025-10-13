import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const user = auth.userSub.value;

  if (user) {
    router.navigate(['/tasks']);
    return false;
  } else {
    return true;
  }
};
