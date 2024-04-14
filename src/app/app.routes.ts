import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginDiscordComponent } from './pages/redirect/redirect-discord/redirect-discord.component';
import { authGuard } from './core/auth/auth.guard';
import { LoginLastFmComponent } from './pages/redirect/redirect-lastfm/redirect-lastfm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { LastfmTopGeneratorDialogComponent } from './components/lastfm-top-generator-dialog/lastfm-top-generator-dialog.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'last-gen',
    component: LastfmTopGeneratorDialogComponent,
  },
  {
    path: 'redirect-discord',
    component: LoginDiscordComponent,
  },
  {
    path: 'redirect-lastfm',
    component: LoginLastFmComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
