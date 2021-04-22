
import { Component, OnInit } from '@angular/core';
import { cdn } from '../../../_nav';
import  msj  from '../../../app_core/services/app-admin/configuracion/menssages';
import { Router } from '@angular/router';
import { UsuarioDispositivoService } from '../../../app_core/services/usuario-dispositivo-service/usuario-dispositivo.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { InfoUsuarioService } from '../../../app_core/services/datos-usuario/info-usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    msj: any;
    cdn : any;
    id_usuario: number;
    dispositivos: any;
    rutas: any;

  constructor(private router: Router, private usuarioDispositivoService:UsuarioDispositivoService,private mensajeService:MensajeService,private infoUsuarioService:InfoUsuarioService) {
    this.msj = msj;
    this.cdn = cdn;
  }

  async ngOnInit() {
    this.id_usuario=2;
    this.obtenerDispositivosUsuario();



      try {
        this.mensajeService.procesando();
        this.rutas=await this.infoUsuarioService.obtenerRutas();
        console.log("ruta",this.rutas);
        this.mensajeService.cerrarMensaje();
      } catch (error) {
        this.mensajeService.enviarMensaje("Error en la consulta","error");
      }

  }

  redireccion(ruta:any){
    console.log(ruta);
    localStorage.setItem("ruta",JSON.stringify(ruta));
      let link =[ruta.direccion_ruta];
      this.router.navigate(link);
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
}
