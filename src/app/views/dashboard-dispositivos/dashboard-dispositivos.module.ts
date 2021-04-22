import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDispositivosRoutingModule } from './dashboard-dispositivos-routing.module';
import { DashboardDispositivosComponent } from './dashboard-dispositivos/dashboard-dispositivos.component';
import { GeneralComponentsModule } from '../../app_core/componentes/componentes.module';

@NgModule({
  declarations: [DashboardDispositivosComponent],
  imports: [
    CommonModule,
    DashboardDispositivosRoutingModule,
    GeneralComponentsModule
  ]
})
export class DashboardDispositivosModule { }
