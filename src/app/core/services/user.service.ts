import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  of,
} from 'rxjs';
import { UserStatus } from 'src/app/core/types/user-status.interface';
import { User } from 'src/app/core/types/user.interface';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { UserAuthentication } from 'src/app/core/types/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userObservable: Observable<User | null>;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private httpClient = inject(HttpClient);
  private _storage = inject(LocalStorageService);

  constructor() {
    this.userObservable = this.userSubject.asObservable();
    this.loadProfile();
  }

  private get authentication(): UserAuthentication | null {
    return this._storage.get('authentication') as UserAuthentication;
  }

  private get profile(): User | null {
    return this._storage.get('profile') as User;
  }

  async loadProfile(): Promise<User | null> {
    if (!this.authentication) {
      this._storage.remove('profile');
      return null;
    }
    if (!this.profile) {
      try {
        const user = await firstValueFrom(
          this.httpClient.get(`${environment.apiUrl}/user/profile`, {
            headers: {
              Authorization: `Bearer ${this.authentication.accessToken}`,
            },
          }),
          { defaultValue: null },
        );
        this._storage.set('profile', user);
        this.userSubject.next(user as unknown as User | null);
        return user as unknown as User | null;
      } catch (error) {
        return null;
      }
    } else {
      this.userSubject.next(this.profile);
      return this.profile;
    }
  }

  async create(): Promise<User | null> {
    if (!this.authentication) {
      return null;
    }
    try {
      const user = await firstValueFrom(
        this.httpClient.post(`${environment.apiUrl}/user/create`, {
          headers: {
            Authorization: `Bearer ${this.authentication.accessToken}`,
          },
        }),
        { defaultValue: null },
      );
      this.userSubject.next(user as unknown as User | null);
      return user as unknown as User | null;
    } catch (error: any) {
      return null;
    }
  }

  async enableLastfmIntegration(token: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post(`${environment.apiUrl}/user/enable-lastfm`, {
        token,
      }),
      { defaultValue: null },
    );
  }

  async lastfmIntegrationStatus(): Promise<any> {
    try {
      const user = await firstValueFrom(
        this.httpClient.get<any>(`${environment.apiUrl}/user/lastfm-status`),
        { defaultValue: null },
      );
      return user;
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
    }
  }

  async deleteLastfmIntegration(): Promise<User | null> {
    const user = await firstValueFrom(
      this.httpClient.delete(`${environment.apiUrl}/user/lastfm`),
      { defaultValue: null },
    );
    return user as unknown as User | null;
  }

  async delete(): Promise<User | null> {
    const user = await firstValueFrom(
      this.httpClient.delete(`${environment.apiUrl}/user/`),
      { defaultValue: null },
    );
    return user as unknown as User | null;
  }

  async toggleScrobble(): Promise<UserStatus | null> {
    const user = await firstValueFrom(
      this.httpClient.patch(`${environment.apiUrl}/user/toggle-scrobble`, {}),
      { defaultValue: null },
    );
    return user as unknown as UserStatus | null;
  }

  async topArtists(period: string): Promise<any> {
    const userId = this.userSubject.value?.id;

    const topArtists = await firstValueFrom(
      this.httpClient.get<any>(
        `${environment.apiUrl}/user/top-artists/${period}/${userId}`,
        {
          headers: {
            'marquinhos-agent': 'web',
          },
        },
      ),
      { defaultValue: null },
    );
    return topArtists;
  }

  async topTracks(period: string): Promise<any> {
    const userId = this.userSubject.value?.id;

    const topTracks = await firstValueFrom(
      this.httpClient.get<any>(
        `${environment.apiUrl}/user/top-tracks/${period}/${userId}`,
        {
          headers: {
            'marquinhos-agent': 'web',
          },
        },
      ),
      { defaultValue: null },
    );
    return topTracks;
  }

  async topAlbums(period: string): Promise<any> {
    const userId = this.userSubject.value?.id;

    const topAlbums = await firstValueFrom(
      this.httpClient.get<any>(
        `${environment.apiUrl}/user/top-albums/${period}/${userId}`,
        {
          headers: {
            'marquinhos-agent': 'web',
          },
        },
      ),
      { defaultValue: null },
    );
    return topAlbums;
  }
}
