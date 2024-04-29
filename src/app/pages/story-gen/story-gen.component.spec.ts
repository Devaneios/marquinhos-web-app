/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StoryGenComponent } from './story-gen.component';

describe('StoryGenComponent', () => {
  let component: StoryGenComponent;
  let fixture: ComponentFixture<StoryGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
