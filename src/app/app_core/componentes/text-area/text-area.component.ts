import { ElementRef } from '@angular/core';
import { Component, Input, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { conditions } from '../conditions';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaComponent),
  multi: true
};

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextAreaComponent implements ControlValueAccessor, OnInit {

  @ViewChild('textarea') textArea: ElementRef

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
  xdisabled: boolean = false

  /**
   * deshabilitar input
   */
  @Input()
  xreadOnly: string = 'false'

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


  constructor() { }

  ngOnInit() {
    if (typeof (this.xdisabled) == 'string') {
      this.xdisabled = (this.xdisabled == 'true') ? true : false;
    }
    try {
      this.control = this.xform.controls[this.xname];
    } catch (error) { }
  }


  changeInput(val: any) {
    this.propagateChange(val);
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { };

  writeValue(value: any) {
    this.textArea.nativeElement.value = value
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

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
