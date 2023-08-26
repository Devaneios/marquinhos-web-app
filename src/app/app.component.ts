import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { Observable } from 'rxjs';
import { User } from './types/user.interface';

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
        *ngIf="router.url !== '/login'"
        (logout)="logout()"
        (settings)="openSettings()"
        (profile)="openProfile()"
        (login)="goToLogin()"
        [user]="user | async"
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
          padding: 1rem 15rem;

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

      @media (max-width: 768px) {
        :host {
          header {
            padding: 1rem 0.5rem;
          }
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  user?: Observable<User | null> = undefined;
  public userService = inject(UserService);
  public router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.userService.userObservable;
    this.userService.profile();
  }

  logout(): void {
    this.authService.logout();
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

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
