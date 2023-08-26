import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await firstValueFrom(
        this.httpClient.get(`${environment.apiUrl}/user/profile`),
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

  logout() {
    firstValueFrom(this.httpClient.get(`${environment.apiUrl}/auth/logout`), {
      defaultValue: null,
    });
  }

  public async login(code: string) {
    await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/auth/login/?code=${code}`),
      { defaultValue: null },
    );
  }
}
