import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Tech} from 'src/types';
import {getUserSettings, Settings} from '../service/firebase';
import {SettingsService} from '../service/settings.service';

@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent implements AfterViewInit {
  readonly techs = Object.values(Tech);
  private readonly settings : Settings = JSON.parse(localStorage.getItem('settings') ?? '');
  enabledTechs: string[] = this.settings.enabledTechs;
  
  settingsForm = new FormGroup({
    enabledTechs: new FormGroup({}),
  });

  constructor(private readonly settingsService: SettingsService) {}

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? [];
  }

  close(): void {
    this.settingsService.closeSettings();
  }
}
