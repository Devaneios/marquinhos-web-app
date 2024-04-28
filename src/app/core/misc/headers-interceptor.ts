import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Authentication } from 'src/app/types/user-auth.interface';

export function headersInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const storage = new LocalStorageService();
  const authentication = storage.get('authentication') as Authentication;
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
