import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  userData?: User;
  private httpClient = inject(HttpClient);

  constructor() {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    if (user) {
      this.userData = user;
    } else {
      this.getDiscordUser().then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userData = user as User;
      });
    }
  }

  private async getDiscordUser(): Promise<User | null> {
    const user = JSON.parse(localStorage.getItem('discord_user_auth')!);

    if (!user) {
      return null;
    }

    const headers = {
      Authorization: `${user.token_type} ${user.token}`,
    };

    const response = (await firstValueFrom(
      this.httpClient.get('https://discord.com/api/users/@me', {
        headers,
      }),
      { defaultValue: null }
    )) as User;

    return response;
  }

  public async loadUserData() {
    const user = await this.getDiscordUser();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userData = user;
    }
  }

  public async logout() {
    this.userData = undefined;
    localStorage.removeItem('user');
  }
}
