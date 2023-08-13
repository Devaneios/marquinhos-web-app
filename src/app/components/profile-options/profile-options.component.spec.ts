import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOptionsComponent } from './profile-options.component';

describe('ProfileOptionsComponent', () => {
  let component: ProfileOptionsComponent;
  let fixture: ComponentFixture<ProfileOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileOptionsComponent]
    });
    fixture = TestBed.createComponent(ProfileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
