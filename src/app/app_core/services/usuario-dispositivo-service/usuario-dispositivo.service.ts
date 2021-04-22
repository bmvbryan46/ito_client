import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../app-admin/configuracion/config';
import { ServiceBase } from '../service-base';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDispositivoService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerDispositivosUsuario(id_usuario):Promise<any>{
    let ruta= [this.ApiUrl, 'obtenerDispositivosUsuario'].join('/');
    return this.http.post(ruta,{id_usuario:id_usuario}).toPromise();
  }
}
