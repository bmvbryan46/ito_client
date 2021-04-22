import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VehiculoGpsService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }
  obtenerVehiculosGps():Observable<any>{
    let ruta= [this.ApiUrl, 'obtenerVehiculosGps'].join('/');
    return this.http.post(ruta,{})

  }
  obtenerUbicacioesDiaVehiculoGps(value:any):Observable<any>{
    let ruta= [this.ApiUrl, 'obtenerUbicacioesDiaVehiculoGps'].join('/');
    return this.http.post(ruta,{id_vehiculo_gps:value})

  }
  obtenerUbicacioesFechaVehiculoGps(value:any,fec_ini:any,fec_fin:any):Observable<any>{
    let ruta= [this.ApiUrl, 'obtenerUbicacioesFechaVehiculoGps'].join('/');
    return this.http.post(ruta,{id_vehiculo_gps:value,fec_ini:fec_ini,fec_fin:fec_fin})

  }

}
