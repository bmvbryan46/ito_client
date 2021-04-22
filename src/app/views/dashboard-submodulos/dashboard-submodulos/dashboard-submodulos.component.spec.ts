import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubmodulosComponent } from './dashboard-submodulos.component';

describe('DashboardSubmodulosComponent', () => {
  let component: DashboardSubmodulosComponent;
  let fixture: ComponentFixture<DashboardSubmodulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubmodulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubmodulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
