import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDiscordComponent } from './redirect-discord.component';

describe('LoginComponent', () => {
  let component: LoginDiscordComponent;
  let fixture: ComponentFixture<LoginDiscordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginDiscordComponent],
    });
    fixture = TestBed.createComponent(LoginDiscordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
