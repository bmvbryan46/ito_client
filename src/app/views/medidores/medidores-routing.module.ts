import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { HistoricosComponent } from './historicos/historicos.component';
import { ListadoMedidoresComponent } from './listado-medidores/listado-medidores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        component: ListadoMedidoresComponent
      },
      {
        path: 'monitoreo/:id_med',
        component: MonitoreoComponent
      },
      {
        path: 'historico/:id_med',
        component: HistoricosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedidoresRoutingModule { }
