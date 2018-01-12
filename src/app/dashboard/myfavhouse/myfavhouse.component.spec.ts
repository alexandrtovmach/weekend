import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavhouseComponent } from './myfavhouse.component';

describe('MyfavhouseComponent', () => {
  let component: MyfavhouseComponent;
  let fixture: ComponentFixture<MyfavhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
