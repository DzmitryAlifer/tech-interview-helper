import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router'; 
import {TechMenu} from './tech-menu.component';


@NgModule({
  declarations: [TechMenu],
  exports: [TechMenu],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class TechMenuModule {}
