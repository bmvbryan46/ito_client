import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { HttpClient } from '@angular/common/http';
import config from '../app-admin/configuracion/config';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService extends ServiceBase{

  constructor(protected http: HttpClient, private socket: Socket) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerRegistrosIdDispositivo(id_dispositivo):Promise<any>{
    let ruta= [this.ApiUrl, 'obtenerRegistrosIdDispositivo'].join('/');
    return this.http.post(ruta,{id_dispositivo:id_dispositivo}).toPromise();
  }

  obtenerIngresos():Promise<any>{
    let ruta= [this.ApiUrl, 'ingreso'].join('/');
    return this.http.get(ruta).toPromise();
  }

  getMessage():Observable<any>{
    return this.socket
        .fromEvent<any>("change")
  }
}
