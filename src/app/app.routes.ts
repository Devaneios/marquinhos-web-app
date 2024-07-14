import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginDiscordComponent } from './pages/redirect/redirect-discord/redirect-discord.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginLastFmComponent } from './pages/redirect/redirect-lastfm/redirect-lastfm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { LastfmStoryComponent } from './components/lastfm-story/lastfm-story.component';
import { StoryGenComponent } from './pages/story-gen/story-gen.component';

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
    path: 'story-gen',
    component: StoryGenComponent,
    canActivate: [authGuard],
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
