import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { HistoricosComponent } from './historicos/historicos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'monitoreo',
        component: MonitoreoComponent
      },
      {
        path: 'historico',
        component: HistoricosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsVehiculosRoutingModule { }
