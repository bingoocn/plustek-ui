import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorEvaluationPage } from './monitor-evaluation.page';

describe('MonitorEvaluationPage', () => {
  let component: MonitorEvaluationPage;
  let fixture: ComponentFixture<MonitorEvaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorEvaluationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorEvaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
