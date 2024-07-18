import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserAuthentication } from 'src/app/core/types/user-auth.interface';

export function headersInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const storage = new LocalStorageService();
  const authentication = storage.get('authentication') as UserAuthentication;
  if (authentication) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authentication.accessToken}`,
        'Refresh-Token': `${authentication.refreshToken}`,
      },
    });
  }
  return next(req);
}
