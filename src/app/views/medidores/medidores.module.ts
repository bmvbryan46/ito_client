import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { ChartsModule } from 'ng2-charts';
import { PanelModule } from 'primeng/panel';

import { MedidoresRoutingModule } from './medidores-routing.module';
import { HistoricosComponent } from './historicos/historicos.component';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { ListadoMedidoresComponent } from './listado-medidores/listado-medidores.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralComponentsModule } from '../../app_core/componentes/componentes.module';

@NgModule({
  declarations: [HistoricosComponent, MonitoreoComponent, ListadoMedidoresComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    ChartsModule,
    PanelModule,
    MedidoresRoutingModule,
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
export class MedidoresModule { }
