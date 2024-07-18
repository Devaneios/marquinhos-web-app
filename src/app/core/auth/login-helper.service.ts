import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginHelperService {
  private readonly _httpClient = inject(HttpClient);

  async discordLoginURL() {
    try {
      const response = await firstValueFrom(
        this._httpClient.get<{ data: string }>(
          `${environment.apiUrl}/auth/discordLoginUrl`,
        ),
        { defaultValue: null },
      );
      return response?.data ?? '';
    } catch (error) {
      return '';
    }
  }

  async lastfmLoginURL() {
    try {
      const response = await firstValueFrom(
        this._httpClient.get<{ data: string }>(
          `${environment.apiUrl}/auth/lastfmLoginUrl`,
        ),
        { defaultValue: null },
      );
      return response?.data ?? '';
    } catch (error) {
      return '';
    }
  }
}
