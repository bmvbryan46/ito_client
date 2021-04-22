import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradasComponent } from './entradas/entradas.component';
import { IngresosMomentoComponent } from './ingresos-momento/ingresos-momento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'entradas',
        component: EntradasComponent
      },
      {
        path: 'ingresos-momento',
        component: IngresosMomentoComponent
      }

    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfidRoutingModule { }
