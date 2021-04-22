import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDispositivosComponent } from './dashboard-dispositivos.component';

describe('DashboardDispositivosComponent', () => {
  let component: DashboardDispositivosComponent;
  let fixture: ComponentFixture<DashboardDispositivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDispositivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
