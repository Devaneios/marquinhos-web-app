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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userObservable: Observable<User | null>;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private httpClient = inject(HttpClient);

  constructor() {
    this.userObservable = this.userSubject.asObservable();
  }

  async profile(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.httpClient.get(`${environment.apiUrl}/user/profile`).pipe(
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
      this.userSubject.next(user as unknown as User | null);
    } catch (error) {}
  }

  async exists(): Promise<boolean> {
    const user = await this.profile();
    return this.userSubject.value !== null;
  }

  async create(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.httpClient.post(`${environment.apiUrl}/user/create`, {}),
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
}
