import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


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
}
