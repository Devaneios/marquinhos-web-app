import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  of,
} from 'rxjs';
import { UserStatus } from 'src/app/types/user-status.interface';
import { User } from 'src/app/types/user.interface';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../misc/local-storage.service';
import { Authentication } from 'src/app/types/user-auth.interface';

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
  }

  private get authentication(): Authentication | null {
    return this._storage.get('authentication') as Authentication;
  }

  private get profile(): User | null {
    return this._storage.get('profile') as User;
  }

  async loadProfile(): Promise<void> {
    if (!this.authentication) {
      return;
    }
    if (!this.profile) {
      try {
        const user = await firstValueFrom(
          this.httpClient
            .get(`${environment.apiUrl}/user/profile`, {
              headers: {
                Authorization: `Bearer ${this.authentication.accessToken}`,
              },
            })
            .pipe(
              catchError((error) => {
                if (
                  error.status === 404 ||
                  error.status === 401 ||
                  error.status === 409
                ) {
                  return of(null);
                }
                throw error;
              }),
            ),
          { defaultValue: null },
        );
        this._storage.set('profile', user);
        this.userSubject.next(user as unknown as User | null);
      } catch (error) {}
    } else {
      this.userSubject.next(this.profile);
    }
  }

  async create(): Promise<void> {
    if (!this.authentication) {
      return;
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
    } catch (error: any) {
      if (error.status === 409) {
        return;
      }
      throw error;
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
