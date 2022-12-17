import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {RightSidePanelService} from '../service/right-side-panel.service';
import {updateSettings} from './state/settings.actions';
import * as appActions from '../store/app.actions';
import * as appSelectors from '../store/app.selectors';


interface EnabledTechs {
  [tech: string]: FormControl<boolean|null>;
}

interface Colors {
  backgroundColorHighlight: FormControl<string|null>;
  colorHighlight: FormControl<string|null>;
}

interface SettingsForm {
  colors: FormGroup<Colors>;
  enabledTechs: FormGroup<EnabledTechs>;
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
  
  readonly backgroundColorHighlight = new FormControl<string>('');
  readonly colorHighlight = new FormControl<string>('');
  private readonly colors = new FormGroup<Colors>({
    backgroundColorHighlight: this.backgroundColorHighlight, 
    colorHighlight: this.colorHighlight,
  });

  readonly settingsForm$ = this.techs$.pipe(
    map(techs => {
      const enabledTechs = new FormGroup<EnabledTechs>({});
      techs.forEach(tech => {
        const toggleControl = this.createToggleControl(this.enabledTechs, tech);
        enabledTechs.setControl(tech, toggleControl);
      });
      return new FormGroup({enabledTechs, colors: this.colors});
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

  close(form: FormGroup<SettingsForm>): void {
    this.rightSidePanelService.close();
    this.setToggleControls(form.controls.enabledTechs);
  }

  saveSettings(form: FormGroup<SettingsForm>): void {
    const enabledTechs = Object.entries(form.value.enabledTechs!)
      .filter(entry => entry[1])
      .map(entry => entry[0]);

    this.enabledTechs = enabledTechs;
    this.store.dispatch(updateSettings({enabledTechs}));
  }

  private createToggleControl(enabledTechs: string[], tech: string): FormControl<boolean|null> {
    const isChecked = enabledTechs.includes(tech);
    return new FormControl<boolean>(isChecked);
  }

  private setToggleControls(form: FormGroup<EnabledTechs>): void {
    this.techs.forEach(tech => {
      form.setControl(tech, this.createToggleControl(this.enabledTechs, tech));
    });
  }
}
