import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMedidoresComponent } from './listado-medidores.component';

describe('ListadoMedidoresComponent', () => {
  let component: ListadoMedidoresComponent;
  let fixture: ComponentFixture<ListadoMedidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMedidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMedidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
