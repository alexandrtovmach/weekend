import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavhousesdtlComponent } from './favhousesdtl.component';

describe('FavhousesdtlComponent', () => {
  let component: FavhousesdtlComponent;
  let fixture: ComponentFixture<FavhousesdtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavhousesdtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavhousesdtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
