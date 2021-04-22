import {
  Component,
  Input,
  forwardRef,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import config from "../../services/app-admin/configuracion/config";
import { ServiceBase } from "../../services/service-base";
import { Observable } from "rxjs";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputAcompleteComponent),
  multi: true
};

@Component({
  selector: "app-input-acomplete",
  templateUrl: "./input-acomplete.component.html",
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputAcompleteComponent extends ServiceBase
  implements ControlValueAccessor, OnInit {

  /**
   * tipo del input ej: text, number, date
   */
  @Input()
  xtype: string = "text";

  /**
   * titulo del input
   */
  @Input()
  titulo: string = "";

  /**
   * placeholder
   */
  @Input()
  xplaceholder: string;


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
   * Lista de datos
   */
  @Input()
  items: any = [];

  /**
   * Lista de datos
   */
  @Input()
  ruta: string = "";

  /**
   * Lista de datos
   */
  //@Input()
  inputVal: string = "";

  @Input()
  listTitulo: string = "";

  @Input()
  listSubTitulo: string = "";


  /**
   * subtuilos que se mostraran
   */
  subtitulos: any = [];

  /**
   * isClick
   */
  isClick: any = false;

  /**
   * isListItem
   */
  isListItem: boolean = false;

  /**
 * nombre del componente
 */
  @Input()
  xname: string = "";

  /**
  *controlador del componente
  */
  control: any;

  /**
   * formGroup del componente
   */
  @Input()
  xform: any

  /**
   * Permite obtener la version simple del autocomplete
   */
  @Input()
  simple: any = false;

  isSearch: boolean = false;

  constructor(protected http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl, config.petUrl].join("/");
  }

  ngOnInit() {
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }
    this.subtitulos = this.listSubTitulo.split(",");
    try {
      this.control = this.xform.controls[this.xname]
    } catch (error) {
    }
  }

  ln = 0;
  changeInput(val: any) {

    ///Sirve para actualizar el inputval después de selectitem
    if (this.ln != val.length) {
      this.inputVal = val
    }

    if (val.length > 1 && this.ln != val.length) {
      this.isListItem = true;
      let value = { value: val };
      this.ln = val.length;
      this.getValues(value)
    }

    this.propagateChange('');
  }

  onClick(val: any) {
    this.isClick = true;
    this.isListItem = true;

    if (val != '') {
      let value = { value: val };
      this.getValues(value)
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  //From ControlValueAccessor interface
  writeValue(value: any) {
    try {
      this.inputVal = value[this.listTitulo]

    } catch (error) {
      this.inputVal = ''
    }

  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) { }

  selectItem(item) {
    this.isListItem = false;
    this.inputVal = item[this.listTitulo]
    this.ln = this.inputVal.length
    this.propagateChange(item);
  }

  outside() {
    if (!this.isClick) {
      this.isListItem = false;
    } else {
      this.isClick = false;
    }
  }

  /**
   * Permite obtener los parámetros generales necesarios para la hoja de vida
   */
  public getService(value): Observable<any> {
    let ruta = [this.ApiUrl, this.ruta].join("/");
    return this.http.post(ruta, value);
  }


  getValues(value) {
    this.isSearch = true
    this.getService(value).subscribe(
      data => {
        this.isSearch = false
        if (data.length > 0) {
          this.items = data;
        } else {
          this.items = [];
        }
      },
      err => {
        this.isSearch = false
        this.items = [];
        console.log(err);
      }
    );

  }
}
