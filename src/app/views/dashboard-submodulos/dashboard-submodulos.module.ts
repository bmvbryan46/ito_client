import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSubmodulosRoutingModule } from './dashboard-submodulos-routing.module';
import { DashboardSubmodulosComponent } from './dashboard-submodulos/dashboard-submodulos.component';


@NgModule({
  declarations: [DashboardSubmodulosComponent],
  imports: [
    CommonModule,
    DashboardSubmodulosRoutingModule
  ]
})
export class DashboardSubmodulosModule { }
