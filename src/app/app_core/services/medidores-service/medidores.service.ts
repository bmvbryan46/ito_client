import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedidoresService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerListaMedidores(): Observable<any> {
    let ruta = [this.ApiUrl, 'medidores'].join('/');
    return this.http.get(ruta);
  }

  obtenerMedidor(id: any): Observable<any> {
    let ruta = [this.ApiUrl, 'medidor', id].join('/');
    return this.http.get(ruta);
  }
}
