import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderCheckPage } from './leader-check.page';

describe('LeaderCheckPage', () => {
  let component: LeaderCheckPage;
  let fixture: ComponentFixture<LeaderCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
