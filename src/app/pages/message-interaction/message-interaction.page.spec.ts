import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInteractionPage } from './message-interaction.page';

describe('MessageInteractionPage', () => {
  let component: MessageInteractionPage;
  let fixture: ComponentFixture<MessageInteractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInteractionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInteractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
