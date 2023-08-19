import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LastfmService } from 'src/app/core/lastfm/lastfm.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { PrivacyPolicyDialogComponent } from 'src/app/components/privacy-policy-dialog/privacy-policy-dialog.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, PrivacyPolicyDialogComponent],
  template: ``,
  styles: [],
})
export class LoginLastFmComponent implements OnInit {
  private dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lastfmService: LastfmService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (param) => {
      const params = new URLSearchParams(param ?? '');
      const access_token = params.get('token');

      if (!access_token) {
        this.router.navigate(['/profile']);
        return;
      }

      const matDialogRef = this.dialog.open(PrivacyPolicyDialogComponent, {
        maxWidth: '550px',
      });

      matDialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          try {
            await this.lastfmService.saveLastfmUserToken(access_token);
          } catch (error) {}
        }
        this.router.navigate(['/profile']);
      });
    });
  }
}
