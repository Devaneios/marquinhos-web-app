import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { toBlob } from 'html-to-image';
import { MatButtonModule } from '@angular/material/button';
import { Platform } from '@angular/cdk/platform';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type LastfmItem = {
  name: string;
  coverArtUrl: string;
};

interface Periods {
  [name: string]: string;
}

const periodMap: Periods = {
  '7day': 'Last week',
  '1month': 'Last month',
  '3month': 'Last 3 months',
  '6month': 'Last 6 months',
  '12month': 'Last year',
  overall: 'Overall',
};

@Component({
  selector: 'app-lastfm-top-generator-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mrq-lastfm',
  },
  templateUrl: './lastfm-top-generator-dialog.component.html',
  styleUrls: ['./lastfm-top-generator-dialog.component.scss'],
})
export class LastfmTopGeneratorDialogComponent implements OnInit {
  @ViewChild('lastfm') lastfmContainer?: ElementRef;

  private _platform = inject(Platform);

  @Input() images: LastfmItem[] = [];
  @Input() set period(value: string) {
    this._period = value;
  }
  get period(): string {
    return periodMap[this._period];
  }
  private _period = '';
  @Input() category = '';
  @Input() username = '';

  imagesData: any[] = [];
  firstImage: any = {};
  image = new Image();

  @HostBinding('class.mrq-lastfm-light') lightTheme = false;
  preview = true;
  @HostBinding('class.mrq-transparent-border') transparentBorder = false;

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  tries = 0;
  sizeInBytes = 0;
  loading = false;

  scaleFactor = 1;

  async shareSvg() {
    this.loading = true;
    await this.sleep(100);
    this.scaleFactor = 1;
    await this.sleep(1000);
    let lastfmBlob = (await toBlob(
      this.lastfmContainer?.nativeElement,
    )) as Blob;
    if (this._platform.IOS || this._platform.SAFARI) {
      lastfmBlob = (await toBlob(this.lastfmContainer?.nativeElement)) as Blob;
      lastfmBlob = (await toBlob(this.lastfmContainer?.nativeElement)) as Blob;
    }

    if (lastfmBlob) {
      if (navigator.share) {
        const imageFile = new File([lastfmBlob], 'shared_image.png', {
          type: 'image/png',
          lastModified: new Date().getTime(),
        });

        navigator
          .share({
            files: [imageFile],
          })
          .then(async () => {
            this.scaleFactor = Math.min((window.innerWidth - 48) / 1080, 0.4);
            await this.sleep(1000);
            this.loading = false;
          })
          .catch((error) => {
            console.error('Error sharing image:', error);
          });
      } else {
        console.log('Web Share API is not supported in this browser.');
      }
    } else {
      console.error('Failed to create Blob from canvas');
    }
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit() {
    this.imagesData = this.images
      .filter((_, index) => index > 0)
      .map((item, index) => {
        const x = 50 + ((index - 1) % 3) * 340;
        const y = 650 + Math.floor((index - 1) / 3) * 340;
        return {
          name: item.name,
          imageBase64: item.coverArtUrl,
          x,
          y,
          width: 300,
          height: 300,
        };
      });

    this.firstImage = {
      name: this.images[0].name,
      imageBase64: this.images[0].coverArtUrl,
      x: 630,
      y: 200,
    };

    this.scaleFactor = Math.min((window.innerWidth - 48) / 1080, 0.4);
    window.addEventListener('resize', () => {
      this.scaleFactor = Math.min((window.innerWidth - 48) / 1080, 0.4);
    });
  }
}
