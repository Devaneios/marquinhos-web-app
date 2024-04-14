import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-lastfm-top-generator-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="mrq-lastfm-root">
      <div class="mrq-lastfm-header">
        <div class="mrq-lastfm-info">
          <div class="mrq-lastfm-name">Guilherme Afonso</div>
          <div class="mrq-lastfm-category">TOP ARTISTS</div>
          <div class="mrq-lastfm-period">LAST MONTH</div>
        </div>
        <div class="mrq-lastfm--first-image">
          <img src="assets/eminem.jpeg" alt="Eminem" width="400" height="400" />
        </div>
      </div>
      <div class="mrq-lastfm-body">
        <div *ngFor="let item of imagesData">
          <div class="mrq-lastfm-image">
            <img
              [src]="item.imageBase64"
              [alt]="item.name"
              [width]="item.width"
              [height]="item.height"
            />
          </div>
          <div class="mrq-lastfm-item-title">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="mrq-lastfm-footer"></div>
    </div>

    <button (click)="shareSvg()">Compartilhar</button>
    <span> {{ message }}</span>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      :host {
        max-width: 540px;

        .mrq-lastfm {
          &-root {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #000;
            color: white;
            font-family: 'Bebas Neue', sans-serif;
            padding: 20px;
            width: 1080px;
            height: 1920px;
            transform: scale(0.5);
            transform-origin: top left;
            background-image: url('../../../assets/background.png');
          }

          &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          &-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          &-body {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          &-image {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            object-fit: cover;
          }

          &-item-title {
            margin-top: 10px;
            font-size: 20px;
          }

          &-text {
            font-family: 'Bebas Neue', sans-serif;
            fill: white;
            text-transform: uppercase;
          }

          &-name {
            font-size: 80px;
            letter-spacing: 2px;
          }

          &-category {
            font-size: 60px;
            letter-spacing: 8px;
          }

          &-period {
            font-size: 40px;
            letter-spacing: 12px;
          }

          &-artist {
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 30px;
            letter-spacing: 2px;
          }
        }
      }
    `,
  ],
})
export class LastfmTopGeneratorDialogComponent implements OnInit {
  @ViewChild('svg') svg?: ElementRef;

  images = [
    {
      name: 'Eminem',
      coverArtUrl: 'assets/eminem.jpeg',
    },
    {
      name: 'Eminem',
      coverArtUrl: 'assets/eminem.jpeg',
    },
    {
      name: 'Alok',
      coverArtUrl: 'assets/alok.jpeg',
    },
    {
      name: 'NF',
      coverArtUrl: 'assets/nf.jpeg',
    },
    {
      name: 'Katy Perry',
      coverArtUrl: 'assets/katy.jpeg',
    },
    {
      name: 'Nicki Minaj',
      coverArtUrl: 'assets/nicki.jpeg',
    },
    {
      name: 'Calvin Harris',
      coverArtUrl: 'assets/calvin.jpeg',
    },
    {
      name: 'Macklemore & Ryan Lewis',
      coverArtUrl: 'assets/macklemore.jpeg',
    },
    {
      name: 'Catfish and the Bottlemen',
      coverArtUrl: 'assets/catfish.jpeg',
    },
    {
      name: 'Flo Rida',
      coverArtUrl: 'assets/florida.jpeg',
    },
  ];

  message = '';
  imagesData: any[] = [];
  firstImage: any = {};
  image = new Image();
  backgroundImage = '';
  data = {};

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {} // public data: any, // @Inject(MAT_DIALOG_DATA) // public dialogRef: MatDialogRef<LastfmTopGeneratorDialogComponent>,

  async getBase64FromUrl(url: string): Promise<string> {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data as string);
      };
    });
  }

  shareSvg() {
    const svg = this.svg?.nativeElement;

    console.log(svg);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const svgXml = new XMLSerializer().serializeToString(svg);

    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + btoa(svgXml);

    image.onload = () => {
      canvas.width = 1080;
      canvas.height = 1920;

      context?.drawImage(image, 0, 0);

      // Convert the canvas to a Blob (PNG format)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (navigator.share) {
              const imageFile = new File([blob], 'shared_image.jpeg', {
                type: 'image/jpeg',
              });

              navigator
                .share({
                  title: 'Shared SVG as Image',
                  files: [imageFile],
                })
                .then(() => {
                  console.log('Image shared successfully');
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
        },
        'image/png',
        1.0,
      );
    };
  }

  async backgroundImageBase64(): Promise<string> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d')?.drawImage(image, 0, 0);
        const canvasDataURL = canvas.toDataURL('image/png');
        canvas.remove();
        resolve(canvasDataURL);
      };
      image.src = 'assets/background.png';
    });
  }

  async ngOnInit() {
    this.imagesData = this.images
      .filter((item, index) => index != 0)
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
      width: 400,
      height: 400,
    };
  }
}
