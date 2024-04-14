import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastfmTopGeneratorDialogComponent } from './lastfm-top-generator-dialog.component';

describe('LastfmTopGeneratorDialogComponent', () => {
  let component: LastfmTopGeneratorDialogComponent;
  let fixture: ComponentFixture<LastfmTopGeneratorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LastfmTopGeneratorDialogComponent]
    });
    fixture = TestBed.createComponent(LastfmTopGeneratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
