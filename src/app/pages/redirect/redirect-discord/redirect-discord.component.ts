import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: ` <p>login works!</p> `,
  styles: [],
})
export class LoginDiscordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(async (fragment) => {
      const params = new URLSearchParams(fragment ?? '');
      const access_token = params.get('access_token');
      const token_type = params.get('token_type');
      const expires_in = params.get('expires_in');

      await this.authService.saveDiscordUserToken(
        access_token ?? '',
        token_type ?? '',
        expires_in ?? ''
      );

      this.router.navigate(['/profile']);
    });
  }
}
