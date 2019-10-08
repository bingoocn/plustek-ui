import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePage } from './notice.page';

describe('NoticePage', () => {
  let component: NoticePage;
  let fixture: ComponentFixture<NoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
