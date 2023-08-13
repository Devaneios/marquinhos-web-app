import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DiscordService } from '../discord/discord.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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
      this.httpClient.post('http://localhost:3000/user-auth', {
        discordId: user.id,
        discordToken: userAuth.token,
        discordTokenExpiresAt: userAuth.expires_at.toString(),
        lastfmToken: token,
      }),
      { defaultValue: null }
    );

    return response;
  }

  async getUserRegisteredStatus() {
    const user = this.discordService.userData;
    const userAuth = JSON.parse(localStorage.getItem('discord_user_auth')!);
    if (!user || !userAuth) return;

    const response = await firstValueFrom(
      this.httpClient.post(`http://localhost:3000/user-auth/${user.id}`, {
        discordToken: userAuth.token,
      }),
      { defaultValue: null }
    );

    return response;
  }
}
