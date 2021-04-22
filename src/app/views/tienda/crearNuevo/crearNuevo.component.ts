
import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { cdn } from '../../../_nav';
import msj from '../../../app_core/services/app-admin/configuracion/menssages';



@Component({
  selector: 'app-crear-nuevo-productos',
  templateUrl: './crearNuevo.component.html',
  styleUrls: ['./crearNuevo.component.scss']
})
export class CrearNuevo {
  lstMarcas: Array<any>;
  lstClase: Array<any>;
  msj: any;
  cdn: any;
  solicitud: any = {
    id_tipo_vinculacion: '',
    id_funcion: '',
    id_cargo: '',
    id_nivel_cargo: '',
    id_mes: '',
    cantidad_solicitada: ["", [Validators.min(2), Validators.max(5)]],
    competencias_tecnicas: '',
    fecha_nacimiento: '',
    fotografia: '',
    telefono:["", [Validators.minLength(2),Validators.maxLength(4)]],
    email:["", [Validators.email]]
  }
  form: any;
  lst: any = [
    { "key": 1, "val": "casa" },
    { "key": 2, "val": "carro" }
  ]

  private listaClases: Array<any>;

  constructor(fb: FormBuilder) {
    this.msj = msj;
    this.cdn = cdn;
    this.form = fb.group(this.solicitud);
  }

  guardar(){
    this.form.submited = true;
    if (this.form.valid) {
      //alert('para el servidor -->');
    } else {
      //alert("estas haciendo algo indebido");
    }
  }

  cancelar(){}
}
