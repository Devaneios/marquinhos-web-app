import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from './types/user.interface';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { AuthService } from './core/auth/auth.service';
import { DiscordService } from './core/discord/discord.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ProfileOptionsComponent,
  ],
  providers: [],
  template: `
    <header>
      <div class="logo" (click)="goToHome()">
        <img src="assets/logo.jpg" alt="logo" class="logo-image" />
        <span class="logo-text">MarquinhosBOT</span>
      </div>
      <app-profile-options
        (logout)="logout()"
        (settings)="openSettings()"
        (profile)="openProfile()"
        [user]="discordService.userData"
      ></app-profile-options>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #36393f;

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #7289da;
          padding: 1rem 1.5rem;
          background-color: #2f3136;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

          .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;

            &-image {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
            }
            &-text {
              font-weight: 600;
              font-size: 1.2rem;
            }
          }
        }
      }
    `,
  ],
})
export class AppComponent {
  public discordService = inject(DiscordService);
  private router = inject(Router);
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
    this.discordService.logout();
    this.router.navigate(['/login']);
  }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  openProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
