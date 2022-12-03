import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {SettingsService} from '../service/settings.service';
import {updateSettings} from './state/settings.actions';


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
export class SettingsPanelComponent implements OnInit, AfterViewInit {
  readonly techs = Object.values(Tech);
  private readonly settings: Settings = JSON.parse(localStorage.getItem('settings') ?? '');
  enabledTechs: string[] = this.settings?.enabledTechs ?? this.techs;
  
  readonly enabledTechsForm = new FormGroup<EnabledTechsForm>({});

  constructor(
    private readonly settingsService: SettingsService,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.techs.forEach(tech => {
      this.enabledTechsForm.addControl(tech, this.createToggleControl(tech));
    });
  }

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? this.enabledTechs;
  }

  close(): void {
    this.settingsService.closeSettings();
  }

  saveSettings(): void {
    const settings: Settings = {enabledTechs: this.getEnabledTechFields()};
    this.store.dispatch(updateSettings(settings));
  }

  private createToggleControl(tech: Tech): FormControl<boolean|null> {
    const isChecked = this.enabledTechs.includes(tech.toString());
    return new FormControl<boolean>(isChecked);
  }

  private getEnabledTechFields(): Tech[] {
    return Object.entries(this.enabledTechsForm.value)
        .filter(entry => entry[1])
        .map(entry => entry[0]) as Tech[];
  }
}
