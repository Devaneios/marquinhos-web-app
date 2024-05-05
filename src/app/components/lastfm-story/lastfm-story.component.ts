import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { toBlob } from 'html-to-image';
import { MatButtonModule } from '@angular/material/button';
import { Platform } from '@angular/cdk/platform';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageDetails } from './image-position';
import { periodMap } from './periods.interface';
import { LastfmItem } from './lastfm-item.type';

@Component({
  selector: 'mrq-lastfm-story',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mrq-lastfm',
    '[class.mrq-lastfm-light]': 'lightTheme',
    '[class.mrq-transparent-border]': 'transparentBorder',
  },
  templateUrl: 'lastfm-story.component.html',
  styleUrls: ['lastfm-story.component.scss'],
})
export class LastfmStoryComponent implements OnInit, AfterViewInit {
  @Input() username = '';
  @Input() category = '';
  @Input() lastfmImages: LastfmItem[] = [];
  @Input() lightTheme = false;
  @Input() transparentBorder = false;

  @Input() set period(value: string) {
    this._period = value;
  }
  get period(): string {
    return periodMap[this._period];
  }

  @ViewChild('lastfm') lastfmContainer?: ElementRef;

  imagesDetails: ImageDetails[] = [];
  firstImage!: ImageDetails;

  private _period = '';
  private _previewBlob: Blob | null = null;
  private _platform = inject(Platform);

  ngOnInit() {
    this.imagesDetails = this.lastfmImages
      .filter((_, index) => index > 0)
      .map((item, index) => {
        const x = 50 + ((index - 1) % 3) * 340;
        const y = 650 + Math.floor((index - 1) / 3) * 340;
        return new ImageDetails({
          name: item.name,
          url: item.coverArtUrl,
          x,
          y,
        });
      });

    this.firstImage = new ImageDetails({
      name: this.lastfmImages[0].name,
      url: this.lastfmImages[0].coverArtUrl,
      x: 630,
      y: 200,
    });
  }

  ngAfterViewInit(): void {
    this.loadPreviewImage();
  }

  get previewImageURL() {
    return this._previewBlob ? URL.createObjectURL(this._previewBlob) : '';
  }

  get previewBlob() {
    return this._previewBlob;
  }

  async loadPreviewImage() {
    this._previewBlob = null;
    if (this._platform.SAFARI || this._platform.IOS) {
      await toBlob(this.lastfmContainer?.nativeElement, {
        preferredFontFormat: 'woff2',
      });
    }
    this._previewBlob = await toBlob(this.lastfmContainer?.nativeElement, {
      preferredFontFormat: 'woff2',
    });
  }
}
