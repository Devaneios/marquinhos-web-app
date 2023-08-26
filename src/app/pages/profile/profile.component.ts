import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/types/user.interface';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [],
  template: `
    <div class="section">
      <h1 class="section-name">Perfil</h1>
      <table>
        <tr>
          <td>Nome de usuário</td>
          <td>{{ (user | async)?.username }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ (user | async)?.id }}</td>
        </tr>
      </table>
    </div>
    <div class="section">
      <h1 class="section-name">Integração com Lastfm</h1>
      <div class="lastfm-status">
        <mat-chip
          highlighted
          [color]="
            !registered
              ? registerStatusMessage !== null
                ? 'warn'
                : 'error'
              : 'primary'
          "
        >
          <mat-icon
            *ngIf="!registered && registerStatusMessage !== null"
            matChipAvatar
            >error</mat-icon
          >
          <mat-icon
            *ngIf="registered && registerStatusMessage !== null"
            matChipAvatar
            >verified</mat-icon
          >
          <mat-icon
            *ngIf="!registered && registerStatusMessage === null"
            matChipAvatar
            >hourglass_empty</mat-icon
          >
          <h2>{{ registerStatusMessage ?? 'Verificando o registro' }}</h2>
        </mat-chip>
        <button
          *ngIf="!registered && registerStatusMessage !== null"
          mat-raised-button
          color="accent"
          (click)="register()"
        >
          Conectar Last.fm
        </button>

        <mat-slide-toggle
          class="scrobble-toggle"
          *ngIf="registered"
          (change)="toggleScrobbles()"
          [disabled]="scrobbleToggleDisabled"
          [checked]="scrobblesOn"
          >Scrobbles on!</mat-slide-toggle
        >
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 2rem 15rem;
        color: #fff;
        gap: 2rem;

        table {
          width: 100%;
          border-collapse: collapse;
          border: none;
          font-size: 1.2rem;

          td {
            padding: 1rem 0;
            border: none;
          }

          tr:not(:last-child) {
            border-bottom: 1px solid #ffffff50;
          }
        }

        .lastfm-status {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: fit-content;
          gap: 1rem;
        }
      }

      @media (max-width: 768px) {
        :host {
          padding: 4rem 0.5rem;
        }
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  registerStatusMessage: string | null = null;
  registered = false;
  scrobblesOn = false;
  scrobbleToggleDisabled = false;
  user?: Observable<User | null> = undefined;

  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  constructor() {}

  ngOnInit(): void {
    this.getRegisterStatus();
    this.user = this._userService.userObservable;
    this._userService.profile();
  }

  register(): void {
    this._authService.goToLastfmLoginURL();
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
