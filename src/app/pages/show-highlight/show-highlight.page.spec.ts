import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHighlightPage } from './show-highlight.page';

describe('ShowHighlightPage', () => {
  let component: ShowHighlightPage;
  let fixture: ComponentFixture<ShowHighlightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHighlightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHighlightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
