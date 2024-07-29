import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { headersInterceptor } from './core/auth/headers-interceptor';
import { AuthStateService } from './core/auth/auth-state.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './core/services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SvgIconDirective } from './components/svg-icon/svg-icon.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIf,
    AsyncPipe,
    RouterOutlet,
    HttpClientModule,
    ProfileOptionsComponent,
    BrowserAnimationsModule,
    MatDialogModule,
    SidebarComponent,
    SvgIconDirective,
  ],
  providers: [
    provideHttpClient(withInterceptors([headersInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      multi: true,
      deps: [AuthStateService, UserService],
    },
    MatDialog,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
