import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TECHS_WITH_ICONS} from 'src/types';
import {SelectedTechService} from '../service/selected-tech.service';
import {selectEnabledTechs} from '../settings-panel/state/settings.selectors';


@Component({
  selector: 'tech-menu',
  templateUrl: './tech-menu.component.html',
  styleUrls: ['./tech-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMenu {
  readonly TECHS_WITH_ICONS = TECHS_WITH_ICONS;
  readonly techs$: Observable<string[]> = this.store.select(selectEnabledTechs);
  readonly techStatuses$: Observable<Map<string, boolean>> = this.selectedTechService.getSelectedTechsMap();

  constructor(
    private readonly selectedTechService: SelectedTechService,
    private readonly store: Store,
  ) {}

  toggleTechRecognition(tech: string): void {
    this.selectedTechService.toggleTechRecognition(tech);
  }
}
