import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
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
    NgIf,
    AsyncPipe,
    RouterOutlet,
    HttpClientModule,
    ProfileOptionsComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user?: Observable<User | null> = undefined;
  public userService = inject(UserService);
  public router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.userService.userObservable;
    this.userService.loadProfile();
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
