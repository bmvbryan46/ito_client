import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';


/**
* Servicio que permite realizar peticiones al servidor acerca de
* la gestión de los datos del usuario que se encuentra autenticado
*/
@Injectable({
  providedIn: 'root'
})
export class InfoUsuarioService extends ServiceBase {
 ApiUrlT: any;
 segUrl: any;
 /**
  * constructor de la clase
  * @param {HttpClient} http  administrador de peticiones http
  */
 constructor(protected http: HttpClient) {
   super(http);
   this.ApiUrl = [config.ApiUrl, config.ApiUrl].join('/');
   this.segUrl = [config.ApiUrl, config.segUrl].join('/');
   this.ApiUrlT = [config.ApiUrl, config.petUrl].join("/");
 }

 /**
  * Método que permite obtener la información del usuario que se encuentra autenticado
  */
 obtenerInformacionUsuario(): Promise<any> {
   let ruta = [this.segUrl, 'infoUsuario'].join('/');
   return this.http.post(ruta, {}).toPromise();
 }


 /**
  * Método que permite obtener la información del usuario que se encuentra autenticado
  */
 obtenerInformacionUsuarioUnidad(datos): Promise<any> {
   let ruta = [this.ApiUrlT, 'getInfoDetaUsuario'].join('/');
   return this.http.post(ruta, datos).toPromise();
 }

 /**
  * Método que permite obtener las rutas a las cuales se encuentra autorizado el usuario autenticado
  */
 obtenerRutas():Promise<any> {
   let ruta = [this.segUrl, 'obtenerRutas'].join('/');
   return this.http.post(ruta, {}).toPromise();
 }

 /**
  * Método que permite cerrar la sesión del usuario y registrar esta actividad en el servidor
  */
 cerrarSesion(): Promise<any> {
   let ruta = [this.ApiUrl, 'cerrarSesion'].join('/');
   return this.http.post(ruta, {}).toPromise();
 }

  /**
  * Método que permite obtener la información del usuario que se encuentra autenticado
  */
 infoToken(): Promise<any> {
  let ruta = [this.segUrl, 'infoToken'].join('/');
   return this.http.post(ruta, {}).toPromise();
}
}
