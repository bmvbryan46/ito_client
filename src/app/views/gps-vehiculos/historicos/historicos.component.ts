import { MensajeService } from './../../../app_core/services/app-admin/mensaje/mensaje.service';
import { VehiculoGpsService } from './../../../app_core/services/vehiculo-gps/vehiculo-gps.service';
import { Component, OnInit } from '@angular/core';
import { cdn } from '../../../_nav';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import msj from '../../../app_core/services/app-admin/configuracion/menssages';
@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.scss']
})
export class HistoricosComponent implements OnInit {
  cdn: any;
  msj: any;
  vehiculosGps: any;
  vehiculoSeleccionado: any;
  vehiculosGpsForm:any;
  formulario: any = {
    id_vehiculo_gps:'',
    fec_ini:null,
    fec_fin:null
  }
 //latitude = 1.231617;
 // longitude = -77.293553;
  latitude = null;
  longitude = null;
  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Punto de partida'
  }
  iconUrl={
    url:"../../../../assets/images/icono-encuentro.png",
    scaledSize: {
        width: 40,
        height: 50
    },
    labelOrigin: { x: 14, y: -8 },
  }
  constructor(private vehiculoGpsService: VehiculoGpsService, private mensajeService: MensajeService, private fb: FormBuilder) {
    this.msj = msj;
    this.cdn = cdn;
  }

  async ngOnInit() {
    this.vehiculosGpsForm = this.fb.group(this.formulario);
    let vehiculos = await this.vehiculoGpsService.obtenerVehiculosGps().subscribe(
      data => {
        this.vehiculosGps = data;
        this.vehiculosGps.forEach(element => {
          element.modelo_gps=element.IotVehiculo.IotTipoVehiculo.nombre+" "+element.IotVehiculo.linea+" "+element.IotVehiculo.marca+" "+element.modelo_gps+" Servicio: "+element.IotVehiculo.IotTipoServicioVehiculo.nombre
        });

      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });
   }
async buscar(){
  this.vehiculosGpsForm.submited = true;
  if (this.vehiculosGpsForm.valid) {
    var id_vehiculo_gps=this.vehiculosGpsForm.get('id_vehiculo_gps').value;
    var fec_ini=new Date(this.vehiculosGpsForm.get('fec_ini').value);
    var fec_fin=new Date(this.vehiculosGpsForm.get('fec_fin').value);
    let ubicaciones = await this.vehiculoGpsService.obtenerUbicacioesFechaVehiculoGps(id_vehiculo_gps,fec_ini,fec_fin).subscribe(
      data => {
        this.vehiculoSeleccionado = data;
        
        //this.setCoordenadasIniciales(this.vehiculoSeleccionado.IotUbicacionVehiculo(0).x,this.vehiculoSeleccionado.IotUbicacionVehiculo(0).y)
        if(this.vehiculoSeleccionado){
        this.setCoordenadasIniciales(this.vehiculoSeleccionado.IotUbicacionVehiculos[0].ubicacion.y,this.vehiculoSeleccionado.IotUbicacionVehiculos[0].ubicacion.x)
        var ultima_posicion=1;
        this.vehiculoSeleccionado.IotUbicacionVehiculos.forEach(element => {
          if(ultima_posicion==this.vehiculoSeleccionado.IotUbicacionVehiculos.length){
            element.labelOptions = {
              color: 'black',
              fontFamily: '',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing:'0.5px',
              text: 'Posición final',
            }
            element.iconUrl={
              url: "../../../../assets/images/icono_veh.png",
              scaledSize: {
                  width: 40,
                  height: 40
              },
              labelOrigin: { x: 16, y: -8 },            
           }
          }else if(ultima_posicion==1){
            element.labelOptions = {
              color: 'black',
              fontFamily: '',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing:'0.5px',
              text: 'Punto de partida',
            }
            element.iconUrl={
              url: "../../../../assets/images/icono-encuentro.png",
              scaledSize: {
                  width: 40,
                  height: 40
              },
              labelOrigin: { x: 16, y: -8 },            
          }
        } else{
          element.labelOptions = {
            color: 'black',
            fontFamily: '',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing:'0.5px',
            text: element.ubicacion,
          }
          element.iconUrl={
            url: "../../../../assets/images/ubicacion.png",
            scaledSize: {
                width: 15,
                height: 15
            },
            labelOrigin: { x: 16, y: -8 },            
        }
      }
        ultima_posicion=ultima_posicion+1;

        });
      }
      
       
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });

  } else {
  }
}
setCoordenadasIniciales(long:any,lati:any){
  this.latitude=lati;
  this.longitude=long;
}
onMouseOver(infoWindow, gm,m) {

  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }

  gm.lastOpen = infoWindow;
  //m.animation = 'BOUNCE';
  m.iconUrl.width= 20;
  m.iconUrl.height= 20;
  infoWindow.open();
}
onMouseOut(m,infoWindow) {
  infoWindow.close();
  m.iconUrl.width= 10;
  m.iconUrl.height= 10;
  //m.animation = null;
}
}
