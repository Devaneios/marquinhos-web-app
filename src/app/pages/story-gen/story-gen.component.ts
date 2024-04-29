import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { LastfmTopGeneratorDialogComponent } from 'src/app/components/lastfm-top-generator-dialog/lastfm-top-generator-dialog.component';
import { UserService } from 'src/app/core/user/user.service';

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
    LastfmTopGeneratorDialogComponent,
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

  @ViewChild(LastfmTopGeneratorDialogComponent)
  story!: LastfmTopGeneratorDialogComponent;
  constructor() {}

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
}
