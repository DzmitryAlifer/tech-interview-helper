import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class RightSidePanelService {
  private isOpen = false;
  private readonly isOpenSubject$ = new Subject<boolean>();
  readonly isOpenPanel$ = this.isOpenSubject$.asObservable();
  
  toggle(): void {
    this.isOpen = !this.isOpen;
    this.isOpenSubject$.next(this.isOpen);
  }

  close(): void {
    this.isOpen = false;
    this.isOpenSubject$.next(false);
  }
}
