import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
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
  deleteLastfmData() {}

  deleteAllData() {}
}
