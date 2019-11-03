import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreplyComponent } from './myreply.component';

describe('MyreplyComponent', () => {
  let component: MyreplyComponent;
  let fixture: ComponentFixture<MyreplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreplyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
