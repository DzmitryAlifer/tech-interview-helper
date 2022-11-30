import {ChangeDetectionStrategy, Component} from '@angular/core';
import { SettingsService } from '../service/settings.service';


@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent {

  constructor(private readonly settingsService: SettingsService) {}

  close(): void {
    this.settingsService.closeSettings();
  }
}
