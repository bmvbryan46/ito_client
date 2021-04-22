import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewsRoutes } from './tienda.routing';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { TableModule } from 'primeng/table';
import { DirectiveModule } from '../../app_core/directivas/directiveModule';
import { ListaProductos } from './listaProductos/listaProductos.component';
import { DetallesProducto } from './detalles/detalles.component';
import { CrearNuevo } from './crearNuevo/crearNuevo.component';
// import { GeneralComponentsModule } from '../../app_core/general_componentes/general-components.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ViewsRoutes),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DirectiveModule,
    TableModule,
    TooltipModule,
    // GeneralComponentsModule

  ],
  declarations: [
    ListaProductos,
    DetallesProducto,
    CrearNuevo
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ],
})
export class TiendaModule { }
