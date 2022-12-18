import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Tech, TECHS_WITH_ICONS} from 'src/types';


@Component({
  selector: 'tech-label',
  templateUrl: './tech-label.component.html',
  styleUrls: ['./tech-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechLabelComponent implements OnInit {
  @Input() tech: Tech | string = '';
  @Input() isBold = false;
  
  hasIcon = false;

  ngOnInit(): void {
    this.hasIcon = TECHS_WITH_ICONS.includes(this.tech);
  }
}
