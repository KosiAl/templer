/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LightDarkToggleComponent } from './lightDarkToggle.component';

describe('LightDarkToggleComponent', () => {
  let component: LightDarkToggleComponent;
  let fixture: ComponentFixture<LightDarkToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightDarkToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightDarkToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
