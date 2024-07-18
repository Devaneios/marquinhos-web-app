import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLastFmComponent } from './redirect-lastfm.component';

describe('LoginLastFmComponent', () => {
  let component: LoginLastFmComponent;
  let fixture: ComponentFixture<LoginLastFmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginLastFmComponent],
    });
    fixture = TestBed.createComponent(LoginLastFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
