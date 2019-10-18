import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationIndexSecondLevelComponent } from './evaluation-index-second-level.component';

describe('EvaluationIndexSecondLevelComponent', () => {
  let component: EvaluationIndexSecondLevelComponent;
  let fixture: ComponentFixture<EvaluationIndexSecondLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationIndexSecondLevelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationIndexSecondLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
