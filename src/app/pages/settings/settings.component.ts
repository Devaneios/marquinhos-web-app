import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { BaseCardComponent } from '../../components/base-card/base-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ConfirmDialogComponent,
    MatDialogModule,
    BaseCardComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  private _userService = inject(UserService);
  dialog = inject(MatDialog);

  deleteLastfmData() {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Você tem certeza?',
        message: 'Não será mais possível fazer o scrobble das suas músicas.',
      },
    });

    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._userService.deleteLastfmIntegration();
      }
    });
  }

  deleteAllData() {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Você tem certeza?',
        message:
          'Todas as suas informações serão removidas e você será desconectado.',
      },
    });

    deleteDialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this._userService.delete();
        window.location.reload();
      }
    });
  }
}
