import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { UserAuthentication } from 'src/app/core/types/user-auth.interface';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _authState = inject(AuthStateService);

  logout(): void {
    this._authState.logout();
  }

  async login(code: string): Promise<boolean> {
    try {
      // this._authState.logout(false);
      const response = await firstValueFrom(
        this._httpClient.get(`${environment.apiUrl}/auth/login/?code=${code}`, {
          observe: 'response',
          responseType: 'json',
        }),
        { defaultValue: null },
      );

      if (response) {
        const accessToken = response.headers
          ?.get('Authorization')
          ?.split(' ')[1];
        const refreshToken = response.headers?.get('Refresh-Token');
        const createdAt = new Date(
          response.headers?.get('Created-At') || '',
        ).getTime();
        const expiresIn =
          parseInt(response.headers?.get('Expires-In') || '0') || 0;
        const expiresAt = createdAt + expiresIn * 1000;
        if (!accessToken || !refreshToken || !expiresAt) {
          return false;
        }
        this._authState.saveSession({
          accessToken,
          refreshToken,
          expiresAt,
        });
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}
