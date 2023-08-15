import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section">
      <div class="section-apps">
        <h1>Apps</h1>
        <div class="section-item"></div>
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

        .section {
          background-color: #2f3136;
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        }
      }
    `,
  ],
})
export class SettingsComponent {}
