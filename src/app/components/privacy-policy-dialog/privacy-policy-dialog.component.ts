import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ScrollStateDirective } from 'src/app/components/scroll-shadow/scroll-state.directive';
import { PrivacyPolicy } from 'src/app/core/types/privacy-policy.interface';

@Component({
  selector: 'app-privacy-policy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ScrollStateDirective,
  ],
  template: `
    <div class="dialog-container">
      <h1 mat-dialog-title class="policy-title">{{ privacyPolicy?.title }}</h1>
      <div mat-dialog-title class="policy-date">{{ privacyPolicy?.date }}</div>
      <div class="dialog-content" mat-dialog-content scrollState>
        <div class="policy-body">{{ privacyPolicy?.body }}</div>
        <div *ngFor="let section of privacyPolicy?.sections">
          <h2 class="policy-section-title">{{ section.title }}</h2>
          <div class="policy-body">{{ section.body }}</div>
        </div>
      </div>
      <div
        *ngIf="showActions; else closeButton"
        class="dialog-actions"
        mat-dialog-actions
      >
        <button
          mat-raised-button
          color="accent"
          [mat-dialog-close]="true"
          cdkFocusInitial
        >
          Aceitar
        </button>
        <button mat-raised-button color="warn" [mat-dialog-close]="false">
          Recusar
        </button>
      </div>

      <ng-template #closeButton>
        <button
          class="close-button"
          mat-raised-button
          color="accent"
          [mat-dialog-close]="true"
        >
          Fechar
        </button>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.2rem;

        .dialog-content {
          overflow-y: overlay;

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-track {
            background: #433939;
          }

          &::-webkit-scrollbar-thumb {
            background: #888;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }

        .policy-date {
          margin-bottom: 1rem;
          font-size: 1rem;
          font-weight: 200;
        }

        .policy-title {
          font-size: 1.6rem;
          text-align: center;
          font-weight: bold;
        }

        .policy-body {
          margin-top: 1rem;
          margin-bottom: 1rem;
          text-align: justify;
          font-size: 1rem;
        }

        .policy-section-title {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.6rem;
          font-weight: bold;
        }

        .dialog-actions {
          margin-top: 1rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .close-button {
          margin-top: 1rem;
        }
      }

      @media (max-width: 768px) {
        .dialog-container {
          width: 100%;
          padding: 0 0.5rem;

          .policy-title {
            font-size: 1.2rem;
          }

          .policy-date {
            font-size: 0.8rem;
          }

          .policy-body {
            font-size: 0.8rem;
          }

          .policy-section-title {
            font-size: 1.2rem;
          }

          .dialog-actions {
            margin-top: 0.5rem;
          }
        }
      }
    `,
  ],
})
export class PrivacyPolicyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      privacyPolicy: PrivacyPolicy | null;
      showActions: boolean | null;
    },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  get privacyPolicy(): PrivacyPolicy | null {
    return this.data.privacyPolicy;
  }

  get showActions(): boolean | null {
    return this.data.showActions;
  }
}
