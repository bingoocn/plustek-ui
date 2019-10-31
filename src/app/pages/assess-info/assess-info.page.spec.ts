import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessInfoPage } from './assess-info.page';

describe('AssessInfoPage', () => {
  let component: AssessInfoPage;
  let fixture: ComponentFixture<AssessInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
