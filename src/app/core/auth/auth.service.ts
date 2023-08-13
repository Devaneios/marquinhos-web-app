import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  constructor(public router: Router) {}

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('discord_user_auth')!);

    if (user == null) {
      return false;
    } else {
      const expires_at = user.expires_at;

      if (new Date().getTime() > expires_at) {
        return false;
      }
      return true;
    }
  }

  async goToLoginURL() {
    window.location.href =
      'https://discord.com/oauth2/authorize?response_type=token&client_id=695137715913621534&scope=identify';
  }

  async saveDiscordUserToken(
    token: string,
    token_type: string,
    expires_in: string
  ) {
    const user = {
      token: token,
      token_type: token_type,
      expires_in: expires_in,
      expires_at: new Date().getTime() + parseInt(expires_in) * 1000,
    };

    localStorage.setItem('discord_user_auth', JSON.stringify(user));
  }

  SignOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('discord_user_auth');
    this.router.navigate(['home']);
  }
}
