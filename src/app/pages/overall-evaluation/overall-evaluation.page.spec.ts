import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallEvaluationPage } from './overall-evaluation.page';

describe('OverallEvaluationPage', () => {
  let component: OverallEvaluationPage;
  let fixture: ComponentFixture<OverallEvaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallEvaluationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallEvaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
