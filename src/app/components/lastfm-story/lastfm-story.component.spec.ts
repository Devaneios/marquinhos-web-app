import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastfmStoryComponent } from './lastfm-story.component';

describe('LastfmTopGeneratorDialogComponent', () => {
  let component: LastfmStoryComponent;
  let fixture: ComponentFixture<LastfmStoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LastfmStoryComponent],
    });
    fixture = TestBed.createComponent(LastfmStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
