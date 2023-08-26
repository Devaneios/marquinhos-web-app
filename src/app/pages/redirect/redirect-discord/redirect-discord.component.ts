import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: ` <p>You should be redirect, nothing to see here!</p> `,
  styles: [],
})
export class LoginDiscordComponent implements OnInit {
  private authService = inject(AuthService);
  private _userService = inject(UserService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (fragment) => {
      const params = new URLSearchParams(fragment ?? '');
      const code = params.get('code');

      if (!code) {
        await this.authService.goToLoginURL();
        return;
      }

      await this.authService.login(code);

      try {
        await this._userService.create();
        await this.router.navigate(['/profile']);
      } catch (error) {
        await this._userService.profile();
        await this.router.navigate(['/profile']);
      }
    });
  }
}
