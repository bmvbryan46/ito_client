import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { conditions } from '../conditions';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {

  /**
   * nombre del componente
   */
  @Input()
  xname: string = "";

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
   * deshabilitar select
   */
  @Input()
  xdisabled: boolean = false;

  /**
   * formulario de error
   */
  @Input()
  xformErrors: any;

  /**
   * Lista de datos que se van a mostrar en la interfaz
   */
  @Input()
  data: any;

  /**
   * campo del valor
   */
  @Input()
  xval: any;

  /**
   * valor a mostrar en la lista
   */
  @Input()
  xopt: any;

  /**
   * verifica si el select is touched
   */
  isTouch: boolean = false;

  /**
   * Valor que permite seleccionar el campo
   */
  valSel: any;

  /**
  *controlador del componente
  */
  control: any;

  /**
   * formGroup del componente
   */
  @Input()
  xform: any;



  constructor() { }

  /**
   * Método inicial
   */
  ngOnInit() {
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }
    try {
      this.control = this.xform.controls[this.xname]
    } catch (error) {

    }

  }

  changeInput(val: any) {
    this.propagateChange(val);
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value != '') {
      this.valSel = value
    } else if (value == '') {
      this.valSel = ''
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

  getError(error) {
    var error
    for (const key in error) {
      error = conditions[key];
    }
    return error
  }
}
