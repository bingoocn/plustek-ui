import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationIndexPage } from './evaluation-index.page';

describe('EvaluationIndexPage', () => {
  let component: EvaluationIndexPage;
  let fixture: ComponentFixture<EvaluationIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationIndexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
