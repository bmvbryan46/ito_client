
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { JLayoutComponent } from './containers';
import { JLayoutsinComponent } from './containers/j-layoutsin/j-layoutsin.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent,
  JLayoutComponent,
  JLayoutsinComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from './containers/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ServicesModule } from './app_core/services/services.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app_core/services/app-admin/seguridad/http-interceptors/auth-interceptor';
import { TooltipModule } from 'ngx-bootstrap';
import { DashboardDispositivosModule } from './views/dashboard-dispositivos/dashboard-dispositivos.module';
import { RfidModule } from './views/rfid/rfid.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GpsVehiculosModule } from './views/gps-vehiculos/gps-vehiculos.module';
import { AlarmasModule } from './views/alarmas/alarmas.module';
import { EstacionesMetModule } from './views/estaciones-met/estaciones-met.module';
import { LuminariasModule } from './views/luminarias/luminarias.module';
import { ChartsModule } from 'ng2-charts';
import { DashboardSubmodulosModule } from './views/dashboard-submodulos/dashboard-submodulos.module';
import { MedidoresModule } from './views/medidores/medidores.module';
import { AgmCoreModule } from '@agm/core';
const config: SocketIoConfig = { url: 'http://10.10.10.125:3031', options: {} };
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ServicesModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DashboardDispositivosModule,
    RfidModule,
    ChartsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    GpsVehiculosModule,
    AlarmasModule,
    EstacionesMetModule,
    LuminariasModule,
    DashboardSubmodulosModule,
    MedidoresModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCozyRd-OOQ1fLo7C9xEn2SM2i9CKVrhbw'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
