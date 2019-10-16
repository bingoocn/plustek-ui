import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementPlanPage } from './improvement-plan.page';

describe('ImprovementPlanPage', () => {
  let component: ImprovementPlanPage;
  let fixture: ComponentFixture<ImprovementPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovementPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
