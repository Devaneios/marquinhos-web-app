import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LastfmService } from 'src/app/core/lastfm/lastfm.service';
import { DiscordService } from 'src/app/core/discord/discord.service';
import { User } from 'src/app/types/user.interface';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
          <td>{{ userData?.username }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ userData?.id }}</td>
        </tr>
      </table>
    </div>
    <div class="section">
      <h1 class="section-name">Lastfm</h1>
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

        <mat-slide-toggle>Scrobbles on!</mat-slide-toggle>
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
        padding: 20px 15rem;
        color: #fff;
        gap: 2rem;

        .section {
          background-color: #2f3136;
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        }

        .section-name {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

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

          h2 {
            font-size: 1.2rem;
          }
        }
      }

      @media (max-width: 768px) {
        :host {
          padding: 20px 0.5rem;
        }
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  registerStatusMessage: string | null = null;
  registered = false;
  userData?: User | null = null;
  private lastfmService: LastfmService = inject(LastfmService);

  private discordService = inject(DiscordService);
  constructor() {}

  ngOnInit(): void {
    this.getRegisterStatus();
    this.userData = this.discordService.userData;
  }

  register(): void {
    this.lastfmService.goToLastfmLoginURL();
  }

  async getRegisterStatus(): Promise<void> {
    try {
      const response = await this.lastfmService.getUserRegisteredStatus();
      if (response) {
        this.registerStatusMessage = 'Conta do Last.fm vinculada!';
        this.registered = true;
      } else {
        this.registerStatusMessage = 'Conta do Last.fm não vinculada!';
        this.registered = false;
      }
    } catch (error) {
      this.registerStatusMessage = 'Conta do Last.fm não vinculada!';

      this.registered = false;
    }
  }
}
