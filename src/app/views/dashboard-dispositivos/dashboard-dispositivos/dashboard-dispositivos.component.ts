import { Component, OnInit } from '@angular/core';
import { UsuarioDispositivoService } from '../../../app_core/services/usuario-dispositivo-service/usuario-dispositivo.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { cdn } from '../../../_nav';
import  msj  from '../../../app_core/services/app-admin/configuracion/menssages';
import { Router } from '@angular/router';
import { InfoUsuarioService } from '../../../app_core/services/datos-usuario/info-usuario.service';

@Component({
  selector: 'app-dashboard-dispositivos',
  templateUrl: './dashboard-dispositivos.component.html',
  styleUrls: ['./dashboard-dispositivos.component.scss']
})
export class DashboardDispositivosComponent implements OnInit {
  dispositivos: any;
  id_usuario: any;
  cdn : any;
  msj: any;
  constructor(private router: Router,private usuarioDispositivoService:UsuarioDispositivoService,private mensajeService:MensajeService,private infoUsuarioService:InfoUsuarioService) {
    this.msj = msj;
    this.cdn = cdn;
   }

  async ngOnInit() {
    localStorage.removeItem("dispositivo");
    this.id_usuario=2;
    try {
      this.mensajeService.procesando();
      this.id_usuario=await this.infoUsuarioService.infoToken();
      this.id_usuario=this.id_usuario.id;
      console.log("usuario",this.id_usuario);
      this.mensajeService.cerrarMensaje();
    } catch (error) {
      this.mensajeService.enviarMensaje("Error en la consulta","error");
    }
    this.obtenerDispositivosUsuario();
  }
  async obtenerDispositivosUsuario(){
    try {
      this.mensajeService.procesando();
      let dispositivos = await this.usuarioDispositivoService.obtenerDispositivosUsuario(this.id_usuario);
      this.dispositivos= dispositivos.dispositivos;
      console.table(this.dispositivos);
      this.mensajeService.cerrarMensaje();
    } catch (error) {
      this.mensajeService.enviarMensaje("Error en la consulta","error");
    }
  }

  redireccion(dispositivo:any){
    console.log(dispositivo);
    localStorage.removeItem("dispositivo");
    localStorage.setItem("dispositivo",JSON.stringify(dispositivo));
      let link =["/home/rfid/ingresos-momento"];
      this.router.navigate(link);
  }
}
