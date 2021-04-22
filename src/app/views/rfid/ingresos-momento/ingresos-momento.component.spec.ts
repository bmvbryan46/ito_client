import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosMomentoComponent } from './ingresos-momento.component';

describe('IngresosMomentoComponent', () => {
  let component: IngresosMomentoComponent;
  let fixture: ComponentFixture<IngresosMomentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresosMomentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosMomentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
