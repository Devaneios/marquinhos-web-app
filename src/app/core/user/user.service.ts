import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
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
    const user = await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/user/profile`),
      { defaultValue: null },
    );
    this.userSubject.next(user as unknown as User | null);
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

  async lastfmIntegrationStatus(): Promise<any> {
    try {
      const user = await firstValueFrom(
        this.httpClient.get<any>(`${environment.apiUrl}/user/lastfm-status`),
        { defaultValue: null },
      );
      console.log(user);
      return user;
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      throw error;
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
      this.httpClient.post(`${environment.apiUrl}/user/toggle-scrobble`, {}),
      { defaultValue: null },
    );
    return user as unknown as UserStatus | null;
  }
}
