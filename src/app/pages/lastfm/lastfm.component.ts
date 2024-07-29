import { Component, inject, OnInit } from '@angular/core';
import { ProfileCardComponent } from 'src/app/components/profile-card/profile-card.component';
import { LastfmStatusCardComponent } from '../../components/lastfm-status-card/lastfm-status-card.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginHelperService } from 'src/app/core/auth/login-helper.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/user.interface';

@Component({
  selector: 'app-lastfm',
  templateUrl: './lastfm.component.html',
  styleUrls: ['./lastfm.component.scss'],
  standalone: true,
  imports: [LastfmStatusCardComponent],
})
export class LastfmComponent implements OnInit {
  registerStatusMessage: string | null = null;
  registered = false;
  scrobblesOn = false;
  scrobbleToggleDisabled = false;
  user?: Observable<User | null> = undefined;

  private readonly _userService = inject(UserService);
  private readonly _loginHelperService = inject(LoginHelperService);
  private readonly _router = inject(Router);
  private readonly _document = inject(DOCUMENT);

  constructor() {}

  ngOnInit(): void {
    this.getRegisterStatus();
    this.user = this._userService.userObservable;
  }

  register(): void {
    this._loginHelperService.lastfmLoginURL().then((url) => {
      this._document.defaultView?.open(url, '_self');
    });
  }

  goToStoryGen(): void {
    this._router.navigate(['/story-gen']);
  }

  async getRegisterStatus(): Promise<void> {
    try {
      const response = await this._userService.lastfmIntegrationStatus();
      if (response && response.id !== '') {
        this.registerStatusMessage = 'Conta do Last.fm vinculada!';
        this.registered = true;
        this.scrobblesOn = response.scrobblesOn;
      } else {
        this.registerStatusMessage = 'Conta do Last.fm não vinculada!';
        this.registered = false;
        this.scrobblesOn = false;
      }
    } catch (error) {
      this.registerStatusMessage = 'Houve um erro ao verificar o registro!';
      this.registered = false;
      this.scrobblesOn = false;
    }
  }

  async toggleScrobbles(): Promise<void> {
    this.scrobbleToggleDisabled = true;
    try {
      const response = await this._userService.toggleScrobble();
      if (response) {
        this.scrobblesOn = response.scrobblesOn;
        this.scrobbleToggleDisabled = false;
      }
    } catch (error) {
      this.scrobblesOn = false;
    }
  }
}
