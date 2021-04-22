import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartsModule } from 'ng2-charts';

import { EstacionesMetRoutingModule } from './estaciones-met-routing.module';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { HistoricosComponent } from './historicos/historicos.component';

@NgModule({
  declarations: [MonitoreoComponent, HistoricosComponent],
  imports: [
    ChartsModule,
    PanelModule,
    CommonModule,
    EstacionesMetRoutingModule
  ]
})
export class EstacionesMetModule { }
