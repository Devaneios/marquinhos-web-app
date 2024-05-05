import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'story-card',
  templateUrl: './lastfm-story-card.component.html',
  styleUrls: ['./lastfm-story-card.component.scss'],
  standalone: true,
  host: {
    class: 'story-card',
    '[style.width.px]': 'width',
    '[style.height.px]': 'height',
  },
})
export class LastfmStoryCardComponent implements OnInit {
  @Output() loaded = new EventEmitter<void>();

  @Input() url = '';
  @Input() name = '';
  @Input() width = 0;
  @Input() height = 0;
  @Input() position = 0;
  @Input() transparentBorder = false;

  constructor() {}
  ngOnInit() {}

  imageLoaded() {
    this.loaded.emit();
  }
}
