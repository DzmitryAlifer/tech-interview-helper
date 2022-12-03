import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {SettingsService} from '../service/settings.service';

interface EnabledTechsForm {
  [tech: string]: FormControl;
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
  private readonly settings : Settings = JSON.parse(localStorage.getItem('settings') ?? '');
  enabledTechs: string[] = this.settings.enabledTechs;
  
  readonly settingsForm = new FormGroup({});

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.techs.forEach(tech => this.settingsForm.addControl(tech, new FormControl()));
  }

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? [];
  }

  close(): void {
    this.settingsService.closeSettings();
  }

  saveSettings(): void {
    const settings = {} as Settings; 
    this.settingsService.saveSettings(settings);
  }
}
