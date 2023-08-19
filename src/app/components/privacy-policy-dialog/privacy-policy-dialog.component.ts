import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LastfmService } from 'src/app/core/lastfm/lastfm.service';
import { PrivacyPolicy } from 'src/app/types/privacy-policy.interface';

@Component({
  selector: 'app-privacy-policy-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{ privacyPolicy?.title }}</h1>
    <div mat-dialog-content>
      <div>{{ privacyPolicy?.date }}</div>
      <div>{{ privacyPolicy?.body }}</div>
      <div *ngFor="let section of privacyPolicy?.sections">
        <h2>{{ section.title }}</h2>
        <div>{{ section.body }}</div>
      </div>
    </div>
    <div mat-dialog-actions>
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
  `,
  styles: [],
})
export class PrivacyPolicyDialogComponent implements OnInit {
  privacyPolicy: PrivacyPolicy | null = null;
  lastfmService = inject(LastfmService);

  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public accepted: boolean,
  ) {}

  ngOnInit(): void {
    this.loadPrivacyPolicy();
  }

  async loadPrivacyPolicy() {
    const privacyPolicy = await this.lastfmService.getPrivacyPolicy();
    this.privacyPolicy = privacyPolicy;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
