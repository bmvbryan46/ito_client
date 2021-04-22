/* import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenMenuComponent } from './imagen-menu/imagen-menu.component';

@NgModule({
  declarations: [ImagenMenuComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenMenuComponent
  ]
})
export class ComponentesModule { }
 */
import { FormsModule } from '@angular/forms';
import { ValidFieldsDirective } from './directivas/valid-fields.directive';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { GeneralComponentsRoutingModule } from './general-components-routing.module';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputAcompleteComponent } from './input-acomplete/input-acomplete.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TextAreaComponent } from './text-area/text-area.component';
import { RichTextComponent } from './rich-text/rich-text.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { ClickOutsideModule } from 'ng-click-outside';
import { OnlyNumberDirective } from './directivas/only-number.directive';
import { PaginationComponent } from './pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';
import { ImagenMenuComponent } from './imagen-menu/imagen-menu.component';
defineLocale('es', esLocale);
@NgModule({
  imports: [
    CommonModule,
    GeneralComponentsRoutingModule,
    TooltipModule,
    BsDatepickerModule,
    ClickOutsideModule,
    TimepickerModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    QuillModule
  ],
  declarations: [
    ImagenMenuComponent,
    InputComponent,
    SelectComponent,
    InputDateComponent,
    InputAcompleteComponent,
    InputFileComponent,
    TextAreaComponent,
    OnlyNumberDirective,
    ValidFieldsDirective,
    PaginationComponent,
    RichTextComponent
  ],
  exports: [
    InputComponent,
    SelectComponent,
    InputDateComponent,
    InputAcompleteComponent,
    InputFileComponent,
    TextAreaComponent,
    OnlyNumberDirective,
    ValidFieldsDirective,
    PaginationComponent,
    RichTextComponent,
    ImagenMenuComponent
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    TitleCasePipe
  ]
})
export class GeneralComponentsModule { }
