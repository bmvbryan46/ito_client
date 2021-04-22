import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';

@Injectable()
export class ProductosService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }


  obtenerListaProductos():Observable<any>{
    let ruta= [this.ApiUrl, 'productos'].join('/');
    return this.http.get(ruta);
  }


}
