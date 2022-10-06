import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechMenu } from './tech-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TechMenu],
  exports: [TechMenu],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class TechMenuModule { }
