import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {RightSidePanelService} from '../service/right-side-panel.service';
import {updateSettings} from './state/settings.actions';
import * as appActions from '../store/app.actions';
import * as appSelectors from '../store/app.selectors';


interface EnabledTechsForm {
  [tech: string]: FormControl<boolean|null>;
}

interface SettingsForm {
  enabledTechs: EnabledTechsForm;
}


@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent implements AfterViewInit {
  readonly techs = Object.values(Tech);
  readonly techs$: Observable<string[]> = this.store.select(appSelectors.selectTechs);
  private readonly settings: Settings = JSON.parse(localStorage.getItem('settings') ?? '');
  private enabledTechs: string[] = this.settings?.enabledTechs ?? [];
  readonly enabledTechsForm = new FormGroup<EnabledTechsForm>({});
  
  readonly enabledTechsForm$ = this.techs$.pipe(
    map(techs => {
      const enabledTechsForm = new FormGroup<EnabledTechsForm>({});
      techs.forEach(tech => {
        const toggleControl = this.createToggleControl(this.enabledTechs, tech);
        enabledTechsForm.setControl(tech, toggleControl);
      });
      return enabledTechsForm;
    }),
  );

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? this.enabledTechs;
  }

  close(form: FormGroup<EnabledTechsForm>): void {
    this.rightSidePanelService.close();
    this.setToggleControls(form);
  }

  saveSettings(form: FormGroup<EnabledTechsForm>): void {
    const enabledTechs = Object.entries(form.value)
      .filter(entry => entry[1])
      .map(entry => entry[0]);

    this.enabledTechs = enabledTechs;
    this.store.dispatch(updateSettings({enabledTechs}));
  }

  private createToggleControl(enabledTechs: string[], tech: string): FormControl<boolean|null> {
    const isChecked = enabledTechs.includes(tech);
    return new FormControl<boolean>(isChecked);
  }

  private setToggleControls(form: FormGroup<EnabledTechsForm>): void {
    this.techs.forEach(tech => {
      form.setControl(tech, this.createToggleControl(this.enabledTechs, tech));
    });
  }
}
