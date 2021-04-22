import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { cdn } from '../../../_nav';
import  msj  from '../../../app_core/services/app-admin/configuracion/menssages';
import { ProductosService } from '../../../app_core/services/productos-service/productos.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';



@Component({
  selector: 'app-lista-productos',
  templateUrl: './listaProductos.component.html',
  styleUrls: ['./listaProductos.component.scss']
})
export class ListaProductos {

  lstProductos: Array<any>;
  productoSel: any;
  msj: any;
  cdn : any;

  constructor(
    private router:Router,
    private serviceProductos: ProductosService,
    private serviceMensaje : MensajeService,
  ){
    this.lstProductos = new Array();
    this.msj = msj;
    this.cdn = cdn;
  }

  ngOnInit() {
    this.listarproductos()
  }

  agregarProducto(){
    this.router.navigate(['/tienda/nuevo']);
  }

  detalle(producto){
    this.router.navigate(['/tienda/detalle',producto.id_producto])
  }

  private listarproductos():void{
    this.serviceMensaje.procesando()
    this.serviceProductos.obtenerListaProductos()
    .subscribe((data)=>{
      this.serviceMensaje.cerrarMensaje();
      this.lstProductos=data;
    },error=>{
      this.serviceMensaje.mensajeErrorServidor(error);
    })
  }
}
