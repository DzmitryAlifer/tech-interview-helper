import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Tech} from 'src/types';
import {SelectedTechService} from '../service/selected-tech.service';
import {SettingsService} from '../service/settings.service';


@Component({
  selector: 'tech-menu',
  templateUrl: './tech-menu.component.html',
  styleUrls: ['./tech-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMenu {
  readonly enabledTechs: Tech[] = this.settingsService.getEnabledTechs();
  readonly techStatuses$: Observable<Map<Tech, boolean>> = this.selectedTechService.getSelectedTechsMap();

  constructor(
    private readonly selectedTechService: SelectedTechService,
    private readonly settingsService: SettingsService,
  ) {}

  toggleTechRecognition(tech: Tech): void {
    this.selectedTechService.toggleTechRecognition(tech);
  }
}
