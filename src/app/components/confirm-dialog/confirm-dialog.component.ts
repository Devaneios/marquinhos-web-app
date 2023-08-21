import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: ` <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div class="dialog-actions" mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Não</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sim</button>
    </div>`,
  styles: [
    `
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string | null;
      message: string | null;
    },
  ) {}
}
