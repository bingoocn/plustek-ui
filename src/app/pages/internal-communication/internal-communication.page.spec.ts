import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalCommunicationPage } from './internal-communication.page';

describe('InternalCommunicationPage', () => {
  let component: InternalCommunicationPage;
  let fixture: ComponentFixture<InternalCommunicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalCommunicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalCommunicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
