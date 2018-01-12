import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneconfirmComponent } from './phoneconfirm.component';

describe('PhoneconfirmComponent', () => {
  let component: PhoneconfirmComponent;
  let fixture: ComponentFixture<PhoneconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
