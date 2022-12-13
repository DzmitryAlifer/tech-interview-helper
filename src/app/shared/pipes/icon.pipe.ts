import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'icon'})
export class IconPipe implements PipeTransform {
  transform(tech: string): string {
    return `../../assets/icons/${tech}.png`;
  }
}
