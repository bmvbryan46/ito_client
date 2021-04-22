import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpsVehiculosRoutingModule } from './gps-vehiculos-routing.module';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { HistoricosComponent } from './historicos/historicos.component';
import { GeneralComponentsModule } from '../../app_core/componentes/componentes.module';

@NgModule({
  declarations: [MonitoreoComponent, HistoricosComponent],
  imports: [
    PanelModule,
    CommonModule,
    GpsVehiculosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralComponentsModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyAqB5rlqNJxCVVGKJO7BvRXKi3kiS5Ir0A'
      apiKey: 'AIzaSyCozyRd-OOQ1fLo7C9xEn2SM2i9CKVrhbw'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    })
  ]
})
export class GpsVehiculosModule { }
