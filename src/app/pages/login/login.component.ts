import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="goToDiscordLogin()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path
          fill="#8c9eff"
          d="M42,45l-9-7.001L34,41H10c-2.761,0-5-2.238-5-5V10c0-2.762,2.239-5,5-5h27c2.762,0,5,2.238,5,5V45z"
        />
        <path
          fill="#fff"
          d="M32.59,16.24c0,0-2.6-2.01-5.68-2.24l-0.27,0.55c2.78,0.67,4.05,1.64,5.38,2.83 C29.73,16.21,27.46,15,23.5,15s-6.23,1.21-8.52,2.38c1.33-1.19,2.85-2.27,5.38-2.83L20.09,14c-3.23,0.31-5.68,2.24-5.68,2.24 S11.5,20.43,11,28.62c2.94,3.36,7.39,3.38,7.39,3.38l0.92-1.23c-1.57-0.54-3.36-1.51-4.9-3.27c1.84,1.38,4.61,2.5,9.09,2.5 s7.25-1.12,9.09-2.5c-1.54,1.76-3.33,2.73-4.9,3.27L28.61,32c0,0,4.45-0.02,7.39-3.38C35.5,20.43,32.59,16.24,32.59,16.24z M20,27 c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5S21.1,27,20,27z M27,27c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5 S28.1,27,27,27z"
        />
      </svg>
      <span> Login with Discord </span>
    </button>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          background-color: #5865f2;
          border: 1px solid #5865f2;
          border-radius: 5px;
          padding: 10px 20px;
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          &:hover {
            background-color: #5865f2d0;
            border: 1px solid #5865f2d0;
          }
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  goToDiscordLogin() {
    this.authService.goToLoginURL();
  }
}
