import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { LastfmService } from 'src/app/core/lastfm/lastfm.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  providers: [],
  template: `
    <div>
      <h2>{{ registerStatusMessage ?? '' }}</h2>
      <button
        *ngIf="!registered"
        mat-raised-button
        color="primary"
        (click)="register()"
      >
        Link Last.fm account
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  registerStatusMessage: string | null = null;
  registered = false;
  private lastfmService: LastfmService = inject(LastfmService);
  constructor() {}

  ngOnInit(): void {
    this.getRegisterStatus();
  }

  register(): void {
    this.lastfmService.goToLastfmLoginURL();
  }

  async getRegisterStatus(): Promise<void> {
    try {
      const response = await this.lastfmService.getUserRegisteredStatus();
      if (response) {
        this.registerStatusMessage = 'Last.fm account linked!';
        this.registered = true;
      } else {
        this.registerStatusMessage = 'Last.fm account not linked!';
        this.registered = false;
      }
    } catch (error) {
      this.registerStatusMessage = 'Last.fm account not linked!';
      this.registered = false;
    }
  }
}
