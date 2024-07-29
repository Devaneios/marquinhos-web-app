import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/services/user.service';
import { Observable } from 'rxjs';
import { User } from './core/types/user.interface';
import { AuthStateService } from './core/auth/auth-state.service';
import { SidebarItem } from './core/types/sidebar-item.type';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user?: Observable<User | null> = undefined;
  showSidebar = false;
  showHeader = true;
  sidebarSelectedItem = '';
  darkTheme = false;
  sidebarCollapsed = true;
  sidebarOptions = [
    { id: 'profile', icon: 'account', label: 'Perfil' },
    { id: 'lastfm', icon: 'music_note', label: 'Lastfm' },
    { id: 'settings', icon: 'settings', label: 'Ajustes' },
    {
      id: 'theme',
      icon: this.darkTheme ? 'light_mode' : 'dark_mode',
      label: this.darkTheme ? 'Claro' : 'Escuro',
    },
    { id: 'logout', icon: 'logout', label: 'Sair' },
  ];
  title = '';
  isLoginPage = false;
  public userService = inject(UserService);
  public router = inject(Router);
  private authService = inject(AuthService);
  private readonly _authStateService = inject(AuthStateService);
  private readonly _document = inject(DOCUMENT);

  ngOnInit(): void {
    this.user = this.userService.userObservable;
    this._authStateService.appAuthState$?.subscribe((state) => {
      this.showSidebar = !!state;
    });

    this.router.events.subscribe(() => {
      this.sidebarSelectedItem = this.router.url.split('/')[1];
      this.showHeader = true;
      if (
        this.sidebarSelectedItem === 'home' ||
        this.sidebarSelectedItem === ''
      ) {
        this.showHeader = false;
      }
      this.isLoginPage = this.sidebarSelectedItem === 'login';
      this.title =
        this.sidebarSelectedItem === 'login'
          ? 'Login'
          : this.sidebarOptions.find(
              (option) => option.id === this.sidebarSelectedItem,
            )?.label || '';
    });
  }

  sidebarClick({ id, label }: SidebarItem): void {
    if (id === 'theme') {
      this.sidebarCollapsed = true;
      this.darkTheme = !this.darkTheme;
      this.sidebarOptions = this.sidebarOptions.map((option) => {
        if (option.id === 'theme') {
          return {
            id: 'theme',
            icon: this.darkTheme ? 'light_mode' : 'dark_mode',
            label: this.darkTheme ? 'Claro' : 'Escuro',
          };
        }
        return option;
      });
      this._document.body.classList.toggle('dark-theme');
      return;
    }

    this.title = label === 'Sair' ? 'Login' : label;
    this.router.navigate([`/${id}`]);

    if (id === 'logout') {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
