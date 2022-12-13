import {CommonModule} from '@angular/common'; 
import {NgModule} from '@angular/core';
import {IconPipe} from './icon.pipe';


@NgModule({
  imports: [CommonModule],
  declarations: [IconPipe],
  exports: [IconPipe],
})
export class PipesModule {}
