import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseCardComponent { }
