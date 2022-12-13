import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../shared/pipes/pipes.module';
import {TechMenu} from './tech-menu.component';


@NgModule({
  imports: [CommonModule, MatButtonModule, PipesModule, RouterModule],
  declarations: [TechMenu],
  exports: [TechMenu],
})
export class TechMenuModule {}
