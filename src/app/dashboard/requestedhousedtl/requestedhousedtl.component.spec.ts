import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedhousedtlComponent } from './requestedhousedtl.component';

describe('RequestedhousedtlComponent', () => {
  let component: RequestedhousedtlComponent;
  let fixture: ComponentFixture<RequestedhousedtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedhousedtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedhousedtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
