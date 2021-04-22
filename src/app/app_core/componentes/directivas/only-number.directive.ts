import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {
  private regex: RegExp = new RegExp(/^(\-|[0-9])[0-9]*(\.[0-9]*){0,1}$/g);
  private regexNumber: RegExp = new RegExp(/^[0-9]*|\.[0-9]*$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
  @Input() isCurrency: boolean = false
  @Input() isNumber: boolean = false

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;

    if (this.isCurrency === true) {
      current = current.replace(/,/g, '')
      current = current.replace(/\$/g, '')
      this.preventWrite(current, event, this.regex)
    } else if (this.isNumber === true) {
      this.preventWrite(current, event, this.regexNumber)
    }
  }

  preventWrite(current, event, regex) {
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }

}
