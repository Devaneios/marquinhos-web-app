import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog.component';

describe('PrivacyPolicyDialogComponent', () => {
  let component: PrivacyPolicyDialogComponent;
  let fixture: ComponentFixture<PrivacyPolicyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrivacyPolicyDialogComponent]
    });
    fixture = TestBed.createComponent(PrivacyPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
