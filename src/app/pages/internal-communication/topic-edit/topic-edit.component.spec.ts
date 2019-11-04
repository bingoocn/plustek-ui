import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEditComponent } from './topic-edit.component';

describe('TopicEditComponent', () => {
  let component: TopicEditComponent;
  let fixture: ComponentFixture<TopicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
