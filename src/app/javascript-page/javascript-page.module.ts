import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JavascriptPage } from './javascript-page.component';



@NgModule({
  declarations: [JavascriptPage],
  exports: [JavascriptPage],
  imports: [
    CommonModule
  ]
})
export class JavascriptPageModule { }
