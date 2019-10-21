import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreportComponent } from './myreport.component';

describe('MyreportComponent', () => {
  let component: MyreportComponent;
  let fixture: ComponentFixture<MyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreportComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
