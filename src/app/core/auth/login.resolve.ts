import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from './auth-state.service';
import { firstValueFrom, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

export const loginResolver: ResolveFn<boolean> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authState = inject(AuthStateService);
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const dialog = inject(MatDialog);

  const userAuth = await firstValueFrom(authState.appAuthState$ || of(null));
  if (userAuth && userAuth.accessToken) {
    return true;
  }

  const code = route.queryParams['code'];
  if (code) {
    return (
      (await authService.login(code)) && !!(await userService.loadProfile())
    );
  }

  if (route.queryParams['logout']) {
    dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atenção',
        message: 'Você foi desconectado. Por favor, faça login novamente.',
      },
    });
  }
  return false;
};
