import { Component, Input, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { conditions } from '../conditions';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDateComponent),
  multi: true
};

@Component({
  selector: "app-input-date",
  templateUrl: "./input-date.component.html",
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputDateComponent implements ControlValueAccessor, OnInit {

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
  * mensaje del error pattern
  */
  @Input()
  mPattern: string = '';

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
   * idioma del calendario
   */
  locale = 'es';

  /**
   * formGroup del componente
   */
  @Input()
  showHora: boolean = false;

  isShowHora: boolean = false;

  hora: Date = new Date();

  horaTemp: any;

  isClick: boolean;

  /**
   * formGroup del componente
   */
  @Input()
  xminDate: Date;

  @Input()
  xmaxDate: Date;

  constructor(private localeService: BsLocaleService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }

    this.localeService.use(this.locale)
    try {
      this.control = this.xform.controls[this.xname];
    } catch (error) { }
  }

  changeInput(val: any, opc) {
    val = val.split(' ')[0]

    if (this.showHora == true && val != '') {
      if (!this.horaTemp || opc == 2) {
        this.horaTemp = this.getHora()
        this.inputVal = val + ' ' + this.horaTemp
      } else {
        this.inputVal = val + ' ' + this.horaTemp
      }
    } else {
      this.inputVal = val
    }
    this.propagateChange(this.transformFecha(this.inputVal));
  }

  changeHora() {
    try {
      let val = this.inputVal.split(' ')[0]
      this.changeInput(val, 2)
    } catch (error) { }
  }

  getHora() {
    return this.datePipe.transform(this.hora, 'hh:mm a')
  }

  transformFecha(fecha) {
    if (fecha == '') {
      return ''
    }
    var fechaArray = fecha.split('/')
    var meridiano = fechaArray[2].split(' ')

    if (meridiano[2] == 'a.') {
      meridiano = meridiano[0] + ' ' + meridiano[1] + ' AM'
    } else if (meridiano[2] == 'p.') {
      meridiano = meridiano[0] + ' ' + meridiano[1] + ' PM'
    } else {
      meridiano = meridiano[0]
    }

    let fechaReal = fechaArray[1] + '/' + fechaArray[0] + '/' + meridiano
    return new Date(fechaReal)
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value) {
      if (this.showHora == true) {
        value = this.datePipe.transform(value, 'dd/MM/yyyy hh:mm a')
        this.horaTemp = value.split(' ')[1] + ' ' + value.split(' ')[2] + ' ' + value.split(' ')[3]
      } else {
        value = this.datePipe.transform(value, 'dd/MM/yyyy')
      }

      this.inputVal = value
    } else {
      this.inputVal = ''
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) { }

  outside() {
    if (!this.isClick) {
      this.isShowHora = false;
    } else {
      this.isClick = false;
    }
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

  clear() {
    this.inputVal = ''
    this.propagateChange('')
  }
}
