import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {TechLabelModule} from '../shared/tech-label/tech-label.module';
import {TechMenu} from './tech-menu.component';


@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule, TechLabelModule],
  declarations: [TechMenu],
  exports: [TechMenu],
})
export class TechMenuModule {}
