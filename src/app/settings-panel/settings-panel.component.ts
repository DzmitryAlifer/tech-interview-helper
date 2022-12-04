import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {RightSidePanelService} from '../service/right-side-panel.service';
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
  private enabledTechs: Tech[] = this.settings?.enabledTechs ?? this.techs;
  readonly enabledTechsForm = new FormGroup<EnabledTechsForm>({});

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.setToggleControls();
  }

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? this.enabledTechs;
  }

  close(): void {
    this.rightSidePanelService.close();
    this.setToggleControls();
  }

  saveSettings(): void {
    const enabledTechs = this.getEnabledTechFields();
    this.enabledTechs = enabledTechs;
    this.store.dispatch(updateSettings({enabledTechs}));
  }

  private createToggleControl(enabledTechs: Tech[], tech: Tech): FormControl<boolean|null> {
    const isChecked = enabledTechs.includes(tech);
    return new FormControl<boolean>(isChecked);
  }

  private getEnabledTechFields(): Tech[] {
    return Object.entries(this.enabledTechsForm.value)
        .filter(entry => entry[1])
        .map(entry => entry[0]) as Tech[];
  }

  private setToggleControls(): void {
    this.techs.forEach(tech => {
      this.enabledTechsForm.setControl(tech, this.createToggleControl(this.enabledTechs, tech));
    });
  }
}
