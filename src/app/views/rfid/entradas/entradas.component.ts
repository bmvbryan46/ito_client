import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresoService } from '../../../app_core/services/ingreso-service/ingreso.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { cdn } from '../../../_nav';
import  msj  from '../../../app_core/services/app-admin/configuracion/menssages';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  msj: any;
  cdn : any;
  ingresos: any;
  cols:any;
  dispositivo:any;
  constructor(private router: Router, private ingresoService:IngresoService,private mensajeService:MensajeService) {
    this.msj = msj;
    this.cdn = cdn;
    this.dispositivo=JSON.parse(localStorage.getItem('dispositivo'));
   }

  ngOnInit() {
    this.obtenerIngresos();

    this.cols = [
      { field: 'num_identificacion', header: 'num identificacion' },
      { field: 'responsable', header: 'responsable' },
      { field: 'fecha_hora', header: 'fecha' },
      { field: 'estado', header: 'estado' }
    ];
  }

  async obtenerIngresos(){
    try {
      this.mensajeService.procesando();
      this.ingresos = await this.ingresoService.obtenerRegistrosIdDispositivo(this.dispositivo.id_dispositivo);
      console.log(this.ingresos);
      let cargar_variables=await this.ingresos.forEach(function(element) {

        if(element.estado_elemento.estado){
          element.estado='ENTRADA'
        } else {
          element.estado='SALIDA'
        }
        if(element.IotElemento.IotElementoVehiculo){
          element.responsable=element.IotElemento.IotElementoVehiculo.IotVehiculo.GenerPersona.primer_nombre+" "+element.IotElemento.IotElementoVehiculo.IotVehiculo.GenerPersona.segundo_nombre+" "+element.IotElemento.IotElementoVehiculo.IotVehiculo.GenerPersona.primer_apellido+" "+element.IotElemento.IotElementoVehiculo.IotVehiculo.GenerPersona.segundo_apellido
          element.num_identificacion=element.IotElemento.IotElementoVehiculo.IotVehiculo.GenerPersona.num_identificacion
        }else if (element.IotElemento.IotElemetoBien){
          console.log("entra");
          element.responsable=element.IotElemento.IotElemetoBien.AlmacBien.TalenEmpleadoCargo.GenerPersona.primer_nombre+" "+element.IotElemento.IotElemetoBien.AlmacBien.TalenEmpleadoCargo.GenerPersona.segundo_nombre+" "+element.IotElemento.IotElemetoBien.AlmacBien.TalenEmpleadoCargo.GenerPersona.primer_apellido+" "+element.IotElemento.IotElemetoBien.AlmacBien.TalenEmpleadoCargo.GenerPersona.segundo_apellido;
          element.num_identificacion=element.IotElemento.IotElemetoBien.AlmacBien.TalenEmpleadoCargo.GenerPersona.num_identificacion
        }
      });
      console.log(this.ingresos);
      this.mensajeService.cerrarMensaje();
    } catch (error) {
      this.mensajeService.enviarMensaje("Error en la consulta","error");
    }
  }

  redireccion(opcion:any){
    if(opcion==1){
      let link =["/home/rfid/ingresos-momento"];
      this.router.navigate(link);
    }
    if(opcion==2){
      let link =["dashboard_dispositivos"];
      this.router.navigate(link);
    }

  }
}
