import {Injectable} from '@angular/core';
import {Tech} from 'src/types';
import {Settings} from '../settings-panel/state/settings.reducers'; 
import {saveUserSettings} from './firebase';


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

  async saveSettings(settings: Settings): Promise<Settings|void|undefined> {
    return saveUserSettings(settings);
  }
}
