import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Tech} from 'src/types';
import {saveUserSettings, Settings} from './firebase';


@Injectable({providedIn: 'root'})
export class SettingsService {
  private isOpen = false;
  private readonly isOpenSettingsSubject$ = new Subject<boolean>();
  readonly isOpenSettings$ = this.isOpenSettingsSubject$.asObservable();
  
  toggleSettings(): void {
    this.isOpen = !this.isOpen;
    this.isOpenSettingsSubject$.next(this.isOpen);
  }

  closeSettings(): void {
    this.isOpen = false;
    this.isOpenSettingsSubject$.next(this.isOpen);
  }

  getSettings(): Settings|null {
    const settingsString = localStorage.getItem('settings');

    if (!settingsString) {
      return null;
    }

    return JSON.parse(settingsString) as Settings;
  }

  getEnabledTechs(): Tech[] {
    return this.getSettings()?.enabledTechs ?? Object.values(Tech);
  }

  saveSettings(settings: Settings) {
    this.closeSettings();
    saveUserSettings(settings);
  }
}
