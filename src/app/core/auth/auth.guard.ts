import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { firstValueFrom, map, of } from 'rxjs';
import { UserAuthentication } from '../types/user-auth.interface';

export const authGuard: CanActivateFn = async (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const loggedIn = await firstValueFrom(
    authState.appAuthState$?.pipe(
      map((userAuth: UserAuthentication | null) => {
        if (!userAuth) {
          return false;
        } else if (new Date().getTime() < userAuth.expiresAt) {
          return true;
        }
        authState.logout(true);
        return false;
      }),
    ) || of(false),
  );

  if (!loggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
