import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { HttpClient } from '@angular/common/http';
import config from '../app-admin/configuracion/config';
@Injectable({
  providedIn: 'root'
})
export class ElementoService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerElementoById(id_elemento):Promise<any>{

    let ruta= [this.ApiUrl, 'obtenerElementoById'].join('/');
    return this.http.post(ruta,{id_elemento:id_elemento}).toPromise();
  }
}

