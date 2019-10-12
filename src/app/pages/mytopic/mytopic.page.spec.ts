import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytopicPage } from './mytopic.page';

describe('MytopicPage', () => {
  let component: MytopicPage;
  let fixture: ComponentFixture<MytopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytopicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
