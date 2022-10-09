import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechMenu } from './tech-menu.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


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
