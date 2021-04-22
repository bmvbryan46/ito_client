import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { conditions } from '../conditions';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichTextComponent),
  multi: true
};

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ["../css/general-styles.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RichTextComponent implements ControlValueAccessor, OnInit {


  /**
   * texto del tooltip
   */
  @Input()
  xtooltip: string;


  /**
  * titulo del input
  */
  @Input()
  titulo: string = "";

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
  * tipo del input ej: text, number, date
  */
  @Input()
  xname: string;

  /**
   * deshabilitar input
   */
  @Input()
  xreadOnly: boolean = false

  /**
   * Permite mostrar solo la vista
   */
  @Input()
  onlyView: boolean = false

  inputVal: any;

  module: {};

  constructor() { }

  ngOnInit() {
    if(typeof (this.onlyView) == 'string'){
      this.onlyView = (this.onlyView == 'true')
    }

    this.module = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        ['clean']
      ]
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
    this.inputVal = value
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  getError(error) {
    var err
    for (const key in error) {
      switch (key) {
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
