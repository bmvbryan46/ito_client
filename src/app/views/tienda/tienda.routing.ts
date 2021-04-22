import { Routes } from '@angular/router';
import { ListaProductos } from './listaProductos/listaProductos.component';
import { CrearNuevo } from './crearNuevo/crearNuevo.component';
import { DetallesProducto } from './detalles/detalles.component';

export const ViewsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Inventario'
    },
    children: [
      {
        path: 'listado', 
        component: ListaProductos,
        data: {
          title: 'Listado'
        }
      },
      {
        path: 'nuevo', 
        component: CrearNuevo,
        data: {
          title: 'Listado'
        }
      },
      {
        path: 'detalle/:id', 
        component: DetallesProducto,
        data: {
          title: 'Listado'
        }
      },
    ]
  }
];
