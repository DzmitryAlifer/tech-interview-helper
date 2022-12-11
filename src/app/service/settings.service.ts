import {Injectable} from '@angular/core';
import {Tech} from 'src/types';
import {saveUserSettings, Settings} from './firebase';


@Injectable({providedIn: 'root'})
export class SettingsService {
  getSettings(): Settings|null {
    const settingsString = localStorage.getItem('settings');

    if (!settingsString) {
      return null;
    }

    return JSON.parse(settingsString) as Settings;
  }

  getEnabledTechs(): string[] {
    return this.getSettings()?.enabledTechs ?? Object.values(Tech);
  }

  saveSettings(settings: Settings) {
    saveUserSettings(settings);
  }
}
