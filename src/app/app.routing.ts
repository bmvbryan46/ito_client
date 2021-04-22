import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JLayoutComponent } from './containers';
import { JLayoutsinComponent } from './containers';
import { LoginGuardService } from './app_core/services/app-admin/seguridad/login-guard/login.guard.service';


export const routes: Routes = [


  {
    path: '',
    component: JLayoutsinComponent,
    canActivate: [LoginGuardService],
    data: {
      title: 'Home'
    },
    children: [

      {
        path: '',
        loadChildren: './views/menu/menu.module#MenuModule'
      }
    ]
  },
  {
    path: 'home',
    component: JLayoutComponent,
    canActivate: [LoginGuardService],
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'tienda',
        loadChildren: './views/tienda/tienda.module#TiendaModule'
      },
      {
        path: 'rfid',
        loadChildren: './views/rfid/rfid.module#RfidModule'
      },
      {
        path: 'gps',
        loadChildren: './views/gps-vehiculos/gps-vehiculos.module#GpsVehiculosModule'
      },
      {
        path: 'met',
        loadChildren: './views/estaciones-met/estaciones-met.module#EstacionesMetModule'
      },
      {
        path: 'med',
        loadChildren: './views/medidores/medidores.module#MedidoresModule'
      },


    ]
  },
  {
    path: 'dashboard_dispositivos',
    component: JLayoutsinComponent,
    canActivate: [LoginGuardService],
    data: {
      title: 'Menu dispositivos'
    },
    children: [
      {
        path: '',
        loadChildren: './views/dashboard-dispositivos/dashboard-dispositivos.module#DashboardDispositivosModule'
      },
    ]
  },
/*   {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
