import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDispositivosComponent } from './dashboard-dispositivos/dashboard-dispositivos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Menu dispositivos'
    },
    children: [
      {
        path: '',
        component: DashboardDispositivosComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDispositivosRoutingModule { }
