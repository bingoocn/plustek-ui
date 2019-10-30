import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAssessPage } from './company-assess.page';

describe('CompanyAssessPage', () => {
  let component: CompanyAssessPage;
  let fixture: ComponentFixture<CompanyAssessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAssessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAssessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
