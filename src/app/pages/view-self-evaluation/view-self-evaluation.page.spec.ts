import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelfEvaluationPage } from './view-self-evaluation.page';

describe('ViewSelfEvaluationPage', () => {
  let component: ViewSelfEvaluationPage;
  let fixture: ComponentFixture<ViewSelfEvaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSelfEvaluationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelfEvaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
