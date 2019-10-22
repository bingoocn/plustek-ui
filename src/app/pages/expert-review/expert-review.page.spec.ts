import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertReviewPage } from './expert-review.page';

describe('ExpertReviewPage', () => {
  let component: ExpertReviewPage;
  let fixture: ComponentFixture<ExpertReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertReviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
