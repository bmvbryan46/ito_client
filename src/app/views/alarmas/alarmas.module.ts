import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmasRoutingModule } from './alarmas-routing.module';
import { ControlComponent } from './control/control.component';
import { HistoricosComponent } from './historicos/historicos.component';

@NgModule({
  declarations: [ControlComponent, HistoricosComponent],
  imports: [
    CommonModule,
    AlarmasRoutingModule
  ]
})
export class AlarmasModule { }
