import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PipesModule} from '../pipes/pipes.module';
import {TechLabelComponent} from './tech-label.component';


@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [TechLabelComponent],
  exports: [TechLabelComponent],
})
export class TechLabelModule {}
