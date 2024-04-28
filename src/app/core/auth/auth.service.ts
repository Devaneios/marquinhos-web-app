import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../misc/local-storage.service';
import { Authentication } from 'src/app/types/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  storage = inject(LocalStorageService);

  async isLoggedIn(): Promise<boolean> {
    try {
      const authentication = this.storage.get(
        'authentication',
      ) as Authentication;
      if (!authentication) {
        return false;
      }
      const user = await firstValueFrom(
        this.httpClient.get(`${environment.apiUrl}/user/profile`, {
          headers: {
            Authorization: `Bearer ${authentication.accessToken}`,
          },
        }),
        { defaultValue: null },
      );
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async goToLoginURL() {
    const response = await firstValueFrom(
      this.httpClient.get<{ data: string }>(
        `${environment.apiUrl}/auth/discordLoginUrl`,
      ),
      { defaultValue: null },
    );
    window.location.href = response?.data ?? '';
  }

  async goToLastfmLoginURL() {
    const response = await firstValueFrom(
      this.httpClient.get<{ data: string }>(
        `${environment.apiUrl}/auth/lastfmLoginUrl`,
      ),
      { defaultValue: null },
    );
    window.location.href = response?.data ?? '';
  }

  logout(): boolean {
    return this.storage.remove('authentication');
  }

  async login(code: string): Promise<boolean> {
    try {
      this.storage.remove('authentication');
      const response = await firstValueFrom(
        this.httpClient.get(`${environment.apiUrl}/auth/login/?code=${code}`, {
          observe: 'response',
          responseType: 'json',
        }),
        { defaultValue: null },
      );

      if (response) {
        console.log(response.headers);
        const accessToken = response.headers
          ?.get('Authorization')
          ?.split(' ')[1];
        const refreshToken = response.headers?.get('Refresh-Token');
        return this.storage.set('authentication', {
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}
