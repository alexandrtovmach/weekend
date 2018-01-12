import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllhousesComponent } from './allhouses.component';

describe('AllhousesComponent', () => {
  let component: AllhousesComponent;
  let fixture: ComponentFixture<AllhousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllhousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllhousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
