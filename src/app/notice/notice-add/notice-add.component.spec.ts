import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeAddComponent } from './notice-add.component';

describe('NoticeAddComponent', () => {
  let component: NoticeAddComponent;
  let fixture: ComponentFixture<NoticeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeAddComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
