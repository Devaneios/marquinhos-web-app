import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LastfmService } from 'src/app/core/lastfm/lastfm.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: ` <p>login-last-fm works!</p> `,
  styles: [],
})
export class LoginLastFmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lastfmService: LastfmService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (param) => {
      const params = new URLSearchParams(param ?? '');
      const access_token = params.get('token');

      try {
        const response = await this.lastfmService.saveLastfmUserToken(
          access_token
        );
      } catch (error) {}

      this.router.navigate(['/profile']);
    });
  }
}
