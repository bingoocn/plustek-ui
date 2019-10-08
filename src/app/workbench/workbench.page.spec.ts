import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbenchPage } from './workbench.page';

describe('WorkbenchPage', () => {
  let component: WorkbenchPage;
  let fixture: ComponentFixture<WorkbenchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
