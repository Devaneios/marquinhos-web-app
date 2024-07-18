import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { PrivacyPolicyDialogComponent } from 'src/app/components/privacy-policy-dialog/privacy-policy-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { MiscService } from 'src/app/core/services/misc.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, PrivacyPolicyDialogComponent],
  template: ``,
  styles: [],
  selector: 'app-login-lastfm',
})
export class LoginLastFmComponent implements OnInit {
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private miscService = inject(MiscService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const response = await this.userService.lastfmIntegrationStatus();

    if (response && response.id !== '') {
      this.router.navigate(['/profile']);
      return;
    }

    this.route.queryParams.subscribe(async (param) => {
      const params = new URLSearchParams(param ?? '');
      const access_token = params.get('token');

      if (!access_token) {
        this.router.navigate(['/profile']);
        return;
      }

      const matDialogRef = this.dialog.open(PrivacyPolicyDialogComponent, {
        data: {
          privacyPolicy: await this.miscService.getPrivacyPolicy(),
          showActions: true,
        },
        maxWidth: '750px',
      });

      matDialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          try {
            await this.userService.enableLastfmIntegration(access_token);
          } catch (error) {}
        }
        this.router.navigate(['/profile']);
      });
    });
  }
}
