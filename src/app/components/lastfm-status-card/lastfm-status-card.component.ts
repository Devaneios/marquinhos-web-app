import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { User } from '../../core/types/user.interface';
import { BaseCardComponent } from '../base-card/base-card.component';

@Component({
  selector: 'app-lastfm-status-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    BaseCardComponent,
  ],
  templateUrl: './lastfm-status-card.component.html',
  styleUrls: ['./lastfm-status-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastfmStatusCardComponent {
  @Output() registerClick = new EventEmitter<void>();
  @Output() storyClick = new EventEmitter<void>();
  @Output() scrobbleChange = new EventEmitter<void>();

  @Input() registerStatusMessage: string | null = null;
  @Input() registered = false;
  @Input() scrobblesOn = false;
  @Input() scrobbleToggleDisabled = false;
  @Input() user?: Observable<User | null> = undefined;
}
