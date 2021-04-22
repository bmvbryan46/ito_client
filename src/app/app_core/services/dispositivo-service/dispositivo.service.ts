import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { HttpClient } from '@angular/common/http';
import config from '../app-admin/configuracion/config';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerListaProductos(data):Promise<any>{
    let ruta= [this.ApiUrl, 'productos'].join('/');
    return this.http.post(ruta,data).toPromise();
  }
}
