import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[validfield]'
})

export class ValidFieldsDirective {
  private regex: RegExp = new RegExp(/^(\w|\d|\s|@|#|\-|\_|\.|\¿|\?|\,|[ñÑáéíóúÁÉÍÓÚ]|\$)*$/g);
  @Input() xtype: string;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.xtype != 'email') {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
    // Allow Backspace, tab, end, and home keys
  }
}
