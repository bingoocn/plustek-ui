import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytopicComponent } from './mytopic.component';

describe('MytopicComponent', () => {
  let component: MytopicComponent;
  let fixture: ComponentFixture<MytopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytopicComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
