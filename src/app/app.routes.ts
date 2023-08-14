import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginDiscordComponent } from './pages/redirect/redirect-discord/redirect-discord.component';
import { authGuard } from './core/auth/auth.guard';
import { LoginLastFmComponent } from './pages/redirect/redirect-lastfm/redirect-lastfm.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'redirect-discord',
    component: LoginDiscordComponent,
  },
  {
    path: 'redirect-lastfm',
    component: LoginLastFmComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
