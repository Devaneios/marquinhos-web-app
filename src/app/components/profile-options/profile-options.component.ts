import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/types/user.interface';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-options',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule],
  template: `
    <div *ngIf="user" [matMenuTriggerFor]="menu" class="menu">
      <img
        *ngIf="user?.avatar"
        [src]="
          'https://cdn.discordapp.com/avatars/' +
          user.id +
          '/' +
          user.avatar +
          '.png'
        "
        alt="avatar"
        class="avatar"
      />
      <span class="username">{{
        user.global_name ? user.global_name : user.username
      }}</span>
      <mat-icon>expand_more</mat-icon>
    </div>
    <mat-menu [class]="'profile-menu-container'" #menu="matMenu">
      <button mat-menu-item>Configurações</button>
      <button mat-menu-item>Sair</button>
    </mat-menu>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #7289da;
        height: 100%;

        .menu {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }

        .username {
          font-weight: 600;
          font-size: 1.2rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOptionsComponent {
  @Input() user: User | null = null;
}
