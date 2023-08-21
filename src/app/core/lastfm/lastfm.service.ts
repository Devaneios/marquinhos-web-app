import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DiscordService } from '../discord/discord.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStatus } from 'src/app/types/user-status.interface';
import { PrivacyPolicy } from 'src/app/types/privacy-policy.interface';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  private httpClient = inject(HttpClient);
  private discordService = inject(DiscordService);
  constructor() {}

  goToLastfmLoginURL() {
    window.location.href = `https://www.last.fm/api/auth/?api_key=eb3754ca8f658f9f0ba740fa04cbc391&cb=${environment.host}/redirect-lastfm`;
  }

  async saveLastfmUserToken(token: string | null) {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!token || !user) return;

    const response = await firstValueFrom(
      this.httpClient.post(`${environment.apiUrl}/user-auth`, {
        discordId: user.id,
        discordToken: userAuth.token,
        lastfmToken: token,
        scrobblesOn: true,
      }),
      { defaultValue: null },
    );

    return response;
  }

  async getUserRegisteredStatus(): Promise<UserStatus | null> {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!user || !userAuth) return null;

    try {
      const response = await firstValueFrom(
        this.httpClient.post(
          `${environment.apiUrl}/user-auth/lastfm-status/${user.id}`,
          {
            discordToken: userAuth.token,
          },
        ),
        { defaultValue: null },
      );

      return response as UserStatus | null;
    } catch (error: any) {
      if (error.status === 404) return { discordId: '', scrobblesOn: false };
      throw error;
    }
  }

  async toggleUserScrobbles(): Promise<UserStatus | null> {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!user || !userAuth) return null;

    const response = await firstValueFrom(
      this.httpClient.patch(`${environment.apiUrl}/user-auth/${user.id}`, {
        discordToken: userAuth.token,
      }),
      { defaultValue: null },
    );

    return response as UserStatus | null;
  }

  async getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
    const response = await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/privacy-policy`),
      { defaultValue: null },
    );

    return response as PrivacyPolicy | null;
  }

  async deleteLastfmUserToken() {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!user || !userAuth) return null;

    const response = await firstValueFrom(
      this.httpClient.delete(`${environment.apiUrl}/user-auth/lastfm-data`, {
        body: { discordId: user.id, discordToken: userAuth.token },
      }),
      { defaultValue: null },
    );

    return response as UserStatus | null;
  }

  async deleteAllUserData() {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!user || !userAuth) return null;

    const response = await firstValueFrom(
      this.httpClient.delete(`${environment.apiUrl}/user-auth/all-data`, {
        body: { discordId: user.id, discordToken: userAuth.token },
      }),
      { defaultValue: null },
    );

    return response as UserStatus | null;
  }
}
