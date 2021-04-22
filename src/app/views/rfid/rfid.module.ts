import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { RfidRoutingModule } from './rfid-routing.module';
import { EntradasComponent } from './entradas/entradas.component';
import { IngresosMomentoComponent } from './ingresos-momento/ingresos-momento.component';


@NgModule({
  declarations: [EntradasComponent, IngresosMomentoComponent],
  imports: [
    CommonModule,
    RfidRoutingModule,
    PanelModule,
    TableModule,
    DropdownModule
  ]
})
export class RfidModule { }
