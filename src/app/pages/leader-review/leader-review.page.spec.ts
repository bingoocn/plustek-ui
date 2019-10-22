import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderReviewPage } from './leader-review.page';

describe('LeaderReviewPage', () => {
  let component: LeaderReviewPage;
  let fixture: ComponentFixture<LeaderReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderReviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
