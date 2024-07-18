import { inject, Injectable } from '@angular/core';
import { UserAuthentication } from '../types/user-auth.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  appAuthState$: Observable<UserAuthentication | null> | null = null;

  private readonly _appAuthState: BehaviorSubject<UserAuthentication | null> =
    new BehaviorSubject<UserAuthentication | null>(null);
  private readonly _router = inject(Router);
  private readonly _storage = inject(LocalStorageService);

  constructor() {
    this.appAuthState$ = this._appAuthState.asObservable();

    const _localuser = this._getUserAuth();

    if (this.checkAuth(_localuser)) {
      this.setState(_localuser);
    } else {
      this.logout();
    }
  }

  setState(item: UserAuthentication | null) {
    this._appAuthState.next(item);
    return this.appAuthState$;
  }

  updateState(item: UserAuthentication) {
    const newItem = { ...this._appAuthState.getValue(), ...item };
    this._appAuthState.next(newItem);
    return this.appAuthState$;
  }

  removeState() {
    this._appAuthState.next(null);
  }

  private _saveUser(user: UserAuthentication) {
    localStorage.setItem('authentication', JSON.stringify(user));
  }
  private _removeUser() {
    localStorage.removeItem('authentication');
  }

  private _getUserAuth(): UserAuthentication | null {
    const _localuser = this._storage.get(
      'authentication',
    ) as UserAuthentication;
    if (_localuser && _localuser.accessToken) {
      return <UserAuthentication>_localuser;
    }
    return null;
  }

  saveSession(user: UserAuthentication): UserAuthentication | null {
    if (user.accessToken) {
      this._saveUser(user);
      this.setState(user);
      return user;
    } else {
      this._removeUser();
      this.removeState();
      return null;
    }
  }

  updateSession(user: UserAuthentication) {
    const _localuser = this._getUserAuth();
    if (_localuser) {
      // only set accesstoken and refreshtoken
      _localuser.accessToken = user.accessToken;
      _localuser.refreshToken = user.refreshToken;

      this._saveUser(_localuser);
      this.updateState(user);
    } else {
      // remove token from user
      this._removeUser();
      this.removeState();
    }
  }

  checkAuth(userAuth: UserAuthentication | null) {
    // if no user, or no accessToken, something terrible must have happened
    if (!userAuth || !userAuth.accessToken) {
      return false;
    }
    // if now is larger that expiresAt, it expired
    if (Date.now() > userAuth.expiresAt) {
      return false;
    }

    return true;
  }

  logout(reroute = false) {
    this.removeState();
    this._removeUser();

    if (reroute) this._router.navigateByUrl('/login?logout=true');
  }
}
