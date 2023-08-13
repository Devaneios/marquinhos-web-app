import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from './types/user.interface';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';

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
      <img src="assets/logo.jpg" alt="logo" class="logo" />
      <app-profile-options [user]="user"></app-profile-options>
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
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
          }
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  user: User | null = null;
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.forEach(() => {
      this.user = JSON.parse(localStorage.getItem('user')!) || null;
    });
  }
}
