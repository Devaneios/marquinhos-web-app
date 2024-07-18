import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginLastFmComponent } from './pages/redirect-lastfm/redirect-lastfm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StoryGenComponent } from './pages/story-gen/story-gen.component';
import { loginResolver } from './core/auth/login.resolve';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { loggedIn: loginResolver },
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
