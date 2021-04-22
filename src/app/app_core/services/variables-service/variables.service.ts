import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { ServiceBase } from '../service-base';
import config from '../app-admin/configuracion/config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VariablesService extends ServiceBase {

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join('/');
  }

  obtenerDatosVariables(id_med:any, num_dat:any): Observable<any> {
    let ruta = [this.ApiUrl, 'variablesMedidor', id_med, num_dat].join('/');

    return this.http.get(ruta);
  }
  obtenerVariablesDatosPorMedidorFecha(id_med:any, num_dat:any,fec_ini:any,fec_fin:any): Observable<any> {
    console.log(id_med);
    let ruta= [this.ApiUrl, 'obtenerVariablesDatosPorMedidorFecha'].join('/');
    return this.http.post(ruta,{id_med:id_med,num_dat:num_dat,fec_ini:fec_ini,fec_fin:fec_fin})
  }
}
