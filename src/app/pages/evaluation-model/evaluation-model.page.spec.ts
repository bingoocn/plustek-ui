import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationModelPage } from './evaluation-model.page';

describe('EvaluationModelPage', () => {
  let component: EvaluationModelPage;
  let fixture: ComponentFixture<EvaluationModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
