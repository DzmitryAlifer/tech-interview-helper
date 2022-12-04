import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class RightSidePanelService {
  private isOpen = false;
  private readonly isOpenSubject$ = new Subject<boolean>();
  readonly isOpenPanel$ = this.isOpenSubject$.asObservable();
  
  toggle(): void {
    this.setToggleState(!this.isOpen);
  }

  close(): void {
    this.setToggleState(false);
  }

  setToggleState(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.isOpenSubject$.next(isOpen);
  }
}
