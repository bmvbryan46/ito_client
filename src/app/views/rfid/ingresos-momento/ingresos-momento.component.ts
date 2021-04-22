import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresoService } from '../../../app_core/services/ingreso-service/ingreso.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { cdn } from '../../../_nav';
import  msj  from '../../../app_core/services/app-admin/configuracion/menssages';
import { Observable } from 'rxjs/index';
import { ElementoService } from '../../../app_core/services/elemento-service/elemento.service';
import { element } from 'protractor';

@Component({
  selector: 'app-ingresos-momento',
  templateUrl: './ingresos-momento.component.html',
  styleUrls: ['./ingresos-momento.component.scss']
})
export class IngresosMomentoComponent implements OnInit {
  msj: any;
  cdn : any;
  dispositivo:any;
  ingresos: any;
  cols:any;
  informacion:any;
  constructor(private router: Router, private ingresoService:IngresoService,private mensajeService:MensajeService,private elementoService:ElementoService ) {
    this.msj = msj;
    this.cdn = cdn;
    this.dispositivo=JSON.parse(localStorage.getItem('dispositivo'));
  }

  async ngOnInit() {


    console.table(this.dispositivo);
    this.obtenerDispositivosUsuario(this.dispositivo.id_dispositivo);
    this.cols = [
      { field: 'id_registro', header: 'id ingreso' },
      { field: 'fecha_hora', header: 'fecha' },
    ];

    let ingreso = await this.ingresoService.getMessage().subscribe(
      data => {

      if(data.id_dispositivo==this.dispositivo.id_dispositivo){
        this.informacion=data;
        console.log("dattaaa",data);
        console.log(this.dispositivo);
        this.obtenerElementoById(this.informacion.id_elemento);
      /*   this.mensajeService.enviarMensajeTime("<center><table border=\"1\" weight=\"100%\"><tr><td>Placa</td><td>"+data.placa+"</td></tr>"+
        "<tr><td>Fecha</td><td>"+data.fecha_hora+"</td></tr>"+
        "<tr><td>Propietario</td><td>"+data.nombre+" "+data.apellido+"</td></tr>"+
        "<tr><td>Identificacion</td><td>"+data.identificacion+"</td></tr></table></center>"
        ,false,10000); */
      }

    },
    err => {
      console.log(err);
      this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      //this.closeViewForm()
    });

  }
  async obtenerDispositivosUsuario(id_dispositivo){
    try {
      //this.mensajeService.procesando();
      this.ingresos = await this.ingresoService.obtenerRegistrosIdDispositivo(parseInt(id_dispositivo));
      console.table(this.ingresos);
      //this.mensajeService.cerrarMensaje();
    } catch (error) {
      this.mensajeService.enviarMensaje("Error en la consulta","error");
    }
  }

  async obtenerElementoById(id_elemento){
    try {
      //this.mensajeService.procesando();
      this.informacion.elemento = await this.elementoService.obtenerElementoById(parseInt(id_elemento));
      this.informacion.elemento=this.informacion.elemento.elemento
      console.log(this.informacion.elemento);
      //this.mensajeService.cerrarMensaje();
    } catch (error) {
      this.mensajeService.enviarMensaje("Error en la consulta","error");
    }
  }

  redireccion(opcion:any){
    if(opcion==1){
      let link =["/home/rfid/entradas"];
      this.router.navigate(link);
    }
    if(opcion==2){
      let link =["dashboard_dispositivos"];
      this.router.navigate(link);
    }

  }

}
