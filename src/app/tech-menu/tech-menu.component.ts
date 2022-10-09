import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tech } from 'src/types';
import { SelectedTechService } from '../service/selected-tech.service';


@Component({
  selector: 'tech-menu',
  templateUrl: './tech-menu.component.html',
  styleUrls: ['./tech-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMenu {
  readonly Tech = Tech;

  readonly techStatuses$ = this.selectedTechService.getSelectedTechsMap();

  constructor(private readonly selectedTechService: SelectedTechService) {}

  toggleTech(tech: Tech): void {
    this.selectedTechService.toggleTech(tech);
  }
}
