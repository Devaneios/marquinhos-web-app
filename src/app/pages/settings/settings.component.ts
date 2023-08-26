import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ConfirmDialogComponent,
    MatDialogModule,
  ],
  template: `
    <div class="section">
      <div class="section-name">
        <h1>Apagar seus Dados</h1>
      </div>
      <div class="section-actions">
        <button mat-raised-button color="warn" (click)="deleteLastfmData()">
          Remover informações do Last.fm
        </button>
        <button mat-raised-button color="warn" (click)="deleteAllData()">
          Remover todas as informações
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px 15rem;
        color: #fff;

        .section-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: fit-content;
        }
      }

      @media screen and (max-width: 768px) {
        :host {
          padding: 20px 0.5rem;
        }
      }
    `,
  ],
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
