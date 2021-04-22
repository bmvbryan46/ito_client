import { Component, Input, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { conditions } from '../conditions';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class InputComponent implements ControlValueAccessor, OnInit {

  /**
  * valor del input
  */
  protected inputVal: string;

  /**
  * tipo del input ej: text, number, date
  */
  @Input()
  xname: string;

  /**
  * propiedad min del  input
  */
  @Input()
  xmin: any;

  /**
  * propiedad max del  input
  */
  @Input()
  xmax: any;


  /**
  * propiedad minlength del  input
  */
  @Input()
  xminlength: number;

  /**
  * propiedad maxlength del  input
  */
  @Input()
  xmaxlength: number;

  /**
   * tipo del input ej: text, number, date
   */
  @Input()
  xtype: string = 'text';

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
  * readOnly input
  */
  @Input()
  xreadOnly: string = 'false';


  /**
  * mensaje del error pattern
  */
  @Input()
  mPattern: string = '';

  /**
  * mensaje del error pattern
  */
  @Input()
  xcurrency: boolean = false;

  /**
  *controlador del componente
  */
  control: any;

  /**
   * formGroup del componente
   */
  @Input()
  xform: any;

  isNumber: boolean;

  @Input()
  xTitleCase: boolean = true

  @Input()
  xUpperCase: boolean = false

  @Input()
  xLowerCase: boolean = false

  constructor(private currencyPipe: CurrencyPipe, private titleCasePipe: TitleCasePipe) { }

  ngOnInit() {

    //VALIDA EL TIPO DE LETRA
    if (typeof (this.xTitleCase) == 'string') {
      this.xTitleCase = (this.xTitleCase == 'true')
    }

    if (typeof (this.xLowerCase) == 'string') {
      this.xLowerCase = (this.xLowerCase == 'true')
    }

    if (typeof (this.xUpperCase) == 'string') {
      this.xUpperCase = (this.xUpperCase == 'true')
    }

    //VALIDA SI EL CAMPO ES DESHABILITADO
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }

    //VALIDA EL TIPO DE CAMPO
    if (this.xtype == 'number' && this.xcurrency == true) {
      this.xtype = 'text'
    }
    if (this.xtype == 'number') {
      this.isNumber = true
    }

    //VALIDA EL LOS NUMERO PERMITIDOS
    try {
      this.control = this.xform.controls[this.xname];
      if (this.xcurrency == true) {
        this.control.setValidators([Validators.pattern('^\$?\-?[0-9]+(\.[0-9]*){0,1}$')]);
        this.mPattern = "valor incorrecto"
      }
    } catch (error) { }
  }

  changeInput(val) {
    if (this.xcurrency == true) {
      try {
        if (val) {
          val = val.replace(/,/g, '')
          val = val.replace(/\$/g, '')
          var valRes = this.currencyPipe.transform(parseFloat(val), null, '$', '1.0-0', 'en-US');
          this.inputVal = valRes
          this.propagateChange(parseFloat(val));
        } else {
          this.propagateChange(val);
        }
      } catch (err) { }
    } else {
      this.inputVal = val // SIRVE PARA LIMPIAR EL INPUT SI NO NO SIRVE
      this.propagateChange(val);
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.xcurrency == true) {
      try {
        value = value.toString()
        value = value.replace(/,/g, '')
        value = value.replace(/\$/g, '')
        var valRes = this.currencyPipe.transform(parseFloat(value), null, '$', '1.0-0', 'en-US');
        this.inputVal = valRes

      } catch (err) { }
    } else {
      this.inputVal = this.validarTipoLetra(value)
    }
  }

  /**
   * Método que permite cargar el tipo de letra
   * @param  {} value
   */
  validarTipoLetra(value) {
    try {

      if (this.xUpperCase == true) {
        value = value.toUpperCase()
      } else if (this.xLowerCase == true) {
        value = value.toLowerCase()
      } else if (this.xTitleCase == true) {
        value = this.titleCasePipe.transform(value)
      }
    } catch (error) { }
    return value
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
    var err
    for (const key in error) {
      switch (key) {
        case 'pattern': err = this.mPattern; break;
        case 'min': err = conditions[key] + error.min.min; break;
        case 'max': err = conditions[key] + error.max.max; break;
        case 'minlength': err = conditions[key] + error.minlength.requiredLength + ' caracteres'; break;
        case 'maxlength': err = conditions[key] + error.maxlength.requiredLength + ' caracteres'; break;
        case 'email': err = conditions[key]; break;
        case 'number': err = conditions[key]; break;
        case 'required': err = conditions[key]; break;
      }
    }
    return err
  }
}
