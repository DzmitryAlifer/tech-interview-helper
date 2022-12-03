import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Tech} from 'src/types';
import {SelectedTechService} from '../service/selected-tech.service';
import {selectEnabledTechs} from '../settings-panel/state/settings.selectors';


@Component({
  selector: 'tech-menu',
  templateUrl: './tech-menu.component.html',
  styleUrls: ['./tech-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMenu {
  readonly techs$: Observable<Tech[]> = this.store.select(selectEnabledTechs);
  readonly techStatuses$: Observable<Map<Tech, boolean>> = this.selectedTechService.getSelectedTechsMap();

  constructor(
    private readonly selectedTechService: SelectedTechService,
    private readonly store: Store,
  ) {}

  toggleTechRecognition(tech: Tech): void {
    this.selectedTechService.toggleTechRecognition(tech);
  }
}
