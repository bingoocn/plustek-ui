import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpriencePage } from './exprience.page';

describe('ExpriencePage', () => {
  let component: ExpriencePage;
  let fixture: ComponentFixture<ExpriencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpriencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpriencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
