import { Component, Input, forwardRef, OnInit, Renderer2, ViewChild, ElementRef, } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { cdn } from '../../../_nav';
import { conditions } from '../conditions';
import config from "../../services/app-admin/configuracion/config";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFileComponent),
  multi: true
};

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputFileComponent implements ControlValueAccessor, OnInit {
  @ViewChild("divfoto") divfoto: ElementRef;

  /**
   * instancia de características globales
   */
  cdn: any;

  /**
   * titulo del input
   */
  @Input()
  titulo: string = "";

  /**
   * texto del tooltip
   */
  @Input()
  xtooltip: string;

  /**
   * deshabilitar input
   */
  @Input()
  xdisabled: boolean = false;

  /**
   * tipos de archivo que acepta
   */
  @Input()
  xaccept: string = '.jpg'

  /**
   * titulo del input
   */
  @Input()
  input_title: string;

  /**
   * titulo del input
   */
  @Input()
  xid: string;

  /**
   * habilita la posibilidad de subir muchos archivos
   */
  @Input()
  xmultiple: string = 'false';


  /**
   * titulo por defecto
   */
  i_title: string = '\xa0\xa0\xa0Subir archivo\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'

  /**
   * permite seleccionar cantidad de archivos a subir
   */
  @Input()
  xnumfiles: number = 0;

  /**
   * valor del titulo
   */
  valFile: { 'nombre': any; 'file': any; 'isChange': boolean };

  /**
   * numero de archivos faltantes que se deben cargar
   */
  minFiles = 0

  /**
   * Lista con los nombres de los archivos cargados
   */
  nameFiles = []

  /**
  * tipo del input ej: text, number, date
  */
  @Input()
  xname: string;

  /**
  *controlador del componente
  */
  control: any;

  /**
   * formGroup del componente
   */
  @Input()
  xform: any;

  /**
  * mensaje de error
  */
  error: string;

  /**
  * comprueba si se muestra la vista de foto
  */
  @Input()
  isphoto: boolean = false;

  /**
  * comprueba si se muestra la vista de foto
  */
  @Input()
  xsize: number = 1024;

  /**
  * comprueba si se muestra error por tamaño
  */
  sizeError: boolean;

  msj: string

  constructor(private render: Renderer2) {
    this.cdn = cdn;
  }

  ngOnInit() {
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }

    try {
      this.control = this.xform.controls[this.xname];
      this.msj = "Seleccione una imagen"
    } catch (err) { }

    if (!this.input_title) {
      this.input_title = this.i_title;
    } else {
      this.i_title = this.input_title;
    }

    if (this.isphoto === true && this.xsize === 1024) {
      this.xsize = 1
    }
  }

  ngOnChanges(changes) {
    try {
      if (changes.xdisabled.currentValue == false) {
        this.xdisabled = false
      } else if (changes.xdisabled.currentValue == true) {
        this.xdisabled = true
      }
    } catch{ }

    try {
      if (changes.xnumfiles) {
        this.input_title = this.i_title;
        this.nameFiles = []
        this.valFile = null
      }
    } catch{ }

  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.nameFiles = []
    if (value != '') {
      this.valFile = value;
      this.valFile.isChange = false;
      this.input_title = this.valFile.nombre;
      if (this.isphoto == true) {
        var directorio = config.archivos + value.directorio + value.nombre
        try {
          this.render.setStyle(this.divfoto.nativeElement, 'content', 'url(' + directorio + ')')

        } catch (error) { }
      }
      try {
        for (var i = 0; i < value.file.length; i++) {
          this.nameFiles.push(value.file[i].GenerArchivo.nombre)
        }
      } catch{ }

    } else {
      this.input_title = this.i_title
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) { }

  touchClick(val: any) {
    this.propagateChange(val);
  }

  /**
   * Permite cambiar los archivos
   * @param event
   */
  imageChange(event) {
    this.sizeError = false
    var files = event.target.files || event.srcElement.files
    var numArchivos = files.length

    if (this.xmultiple == 'false') {
      this.obtenerUnArchivo(files[0])
    } else {
      this.nameFiles = []

      for (var i = 0; i < files.length; i++) {
        this.nameFiles.push(files[i].name)
      }

      this.valFile = {
        'nombre': 'No. Archivos ' + numArchivos,
        'file': files,
        'isChange': true
      }

      this.input_title = 'No. Archivos ' + numArchivos;
      this.minFiles = this.xnumfiles - numArchivos

      if (this.minFiles > 0) {
        this.valFile = null;
        this.propagateChange(this.valFile);
      }
      else if (this.minFiles < 0) {
        this.valFile = null;
        this.propagateChange(this.valFile);
      } else {
        this.propagateChange(this.valFile);
      }
    }
  }

  obtenerUnArchivo(file) {
    let size = file.size / 1024 / 1024
    if (this.xsize >= size) {
      this.valFile = {
        'nombre': file.name,
        'file': file,
        'isChange': true
      }
      this.input_title = this.valFile.nombre;
      this.propagateChange(this.valFile);
    } else {
      this.sizeError = true
    }
  }

  getError(error) {
    var err
    for (const key in error) {
      switch (key) {
        case 'required': err = conditions[key]; break;
      }
    }
    return err
  }

  openFile(element) {
    element.click()
  }

  photoChange(event, element) {
    this.sizeError = false
    let files = event.target.files || event.srcElement.files
    let file = files[0]
    let pattern = /image-*/;
    let reader = new FileReader();
    let mb = file.size / 1024 / 1024
    if (!file.type.match(pattern) || mb > this.xsize) {
      if (!file.type.match(pattern)) {
        this.msj = 'Archivo no compatible'

      } else {
        this.msj = 'El tamaño debe ser menor ' + this.xsize + ' mb'
      }

      this.render.removeStyle(element, 'content')
      this.sizeError = true
      this.valFile = null
      this.propagateChange(this.valFile);
    } else {
      this.valFile = {
        'nombre': file.name,
        'file': file,
        'isChange': true
      }
      reader.onload = (e) => {
        this.render.setStyle(element, 'content', 'url(' + reader.result + ')')
        this.propagateChange(this.valFile);
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * Permite eliminar los archivos creados
   */
  clear() {
    this.valFile = null;
    this.input_title = this.i_title;
    this.propagateChange(this.valFile);
    this.nameFiles = []
    this.minFiles = 0
  }

  clear_photo(element, input) {
    this.msj = "Seleccione una imagen"
    input.value = ''
    this.render.removeStyle(element, 'content')
    this.valFile = null;
    this.propagateChange(this.valFile);
    this.nameFiles = []
    this.minFiles = 0

  }
}
