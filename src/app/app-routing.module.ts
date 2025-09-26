import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { loginResolver } from './core/auth/login.resolve';
import { HomeComponent } from './pages/home/home.component';
import { LastfmComponent } from './pages/lastfm/lastfm.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginLastFmComponent } from './pages/redirect-lastfm/redirect-lastfm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StoryGenComponent } from './pages/story-gen/story-gen.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Marquinhos - Início',
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { loggedIn: loginResolver },
    title: 'Marquinhos - Login',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Marquinhos - Perfil',
  },
  {
    path: 'story-gen',
    component: StoryGenComponent,
    canActivate: [authGuard],
    title: 'Marquinhos - Last.fm Story Generator',
  },
  {
    path: 'redirect-lastfm',
    component: LoginLastFmComponent,
    canActivate: [authGuard],
    title: 'Marquinhos - Redirecionando do Last.fm',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
    title: 'Marquinhos - Ajustes',
  },
  {
    path: 'lastfm',
    component: LastfmComponent,
    canActivate: [authGuard],
    title: 'Marquinhos - Last.fm',
  },
  {
    path: 'gamification',
    loadComponent: () => import('./pages/gamification/gamification.component').then(m => m.GamificationComponent),
    canActivate: [authGuard],
    title: 'Marquinhos - Gamificação',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    title: 'Marquinhos - Início',
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
