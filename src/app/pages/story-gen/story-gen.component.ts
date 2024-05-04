import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { LastfmStoryComponent } from 'src/app/components/lastfm-story/lastfm-story.component';
import { UserService } from 'src/app/core/user/user.service';
import { Platform } from '@angular/cdk/platform';
import { ShareService } from 'src/app/core/misc/share.service';

@Component({
  selector: 'app-story-gen',
  templateUrl: './story-gen.component.html',
  styleUrls: ['./story-gen.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatRadioModule,
    MatButtonModule,
    CdkAccordionModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    LastfmStoryComponent,
  ],
})
export class StoryGenComponent implements OnInit {
  selectedPeriod$ = new BehaviorSubject<string>('Último mês');
  periodValue = '1month';
  selectedCategory$ = new BehaviorSubject<string>('Artistas');
  categoryValue = 'artists';
  previewOpen = false;
  username = '';
  images = [];
  loading = false;

  private _userService = inject(UserService);
  private _platform = inject(Platform);
  private _shareService = inject(ShareService);

  @ViewChild(LastfmStoryComponent)
  story!: LastfmStoryComponent;
  constructor() {}

  get isSafari() {
    return this._platform.SAFARI || this._platform.IOS;
  }

  ngOnInit() {}

  onCategoryChange(event: MatRadioChange) {
    if (event) {
      this.categoryValue = event.value;
      this.selectedCategory$.next(
        (event.source._elementRef.nativeElement as HTMLElement).innerText,
      );
    }
  }

  onPeriodChange(event: MatRadioChange) {
    if (event) {
      this.periodValue = event.value;
      this.selectedPeriod$.next(
        (event.source._elementRef.nativeElement as HTMLElement).innerText,
      );
    }
  }

  async openPreview() {
    let lastfmData = null;
    this.loading = true;
    if (this.categoryValue === 'artists') {
      lastfmData = await this._userService.topArtists(this.periodValue);
    } else if (this.categoryValue === 'tracks') {
      lastfmData = await this._userService.topTracks(this.periodValue);
    } else if (this.categoryValue === 'albums') {
      lastfmData = await this._userService.topAlbums(this.periodValue);
    }
    if (lastfmData) {
      this.username = lastfmData.profileName;
      this.images = lastfmData[this.categoryValue];
      this.previewOpen = true;
    }
    this.loading = false;
  }

  closePreview() {
    this.previewOpen = false;
  }

  share() {
    if (this.story.previewBlob) {
      this._shareService.shareBlobAsPng(
        this.story.previewBlob,
        `${this.username}-lastfm-top-${this.categoryValue}-${this.periodValue}`,
      );
    }
  }
}
