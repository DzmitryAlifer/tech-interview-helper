import {HostBinding, Injectable} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Theme} from 'src/types';
import {BehaviorSubject} from 'rxjs';


const THEME_KEY = 'theme';


@Injectable({providedIn: 'root'})
export class ThemeService {
  @HostBinding('class') activeThemeCssClass!: string;

  private theme = localStorage.getItem(THEME_KEY) as Theme ?? Theme.LIGHT;
  readonly theme$ = new BehaviorSubject<Theme>(this.theme);
  
  constructor(private readonly overlayContainer: OverlayContainer) { 
    this.setTheme(this.theme); 
  }

  getTheme(): Theme {
    this.setTheme(this.theme);
    return this.theme;
  }

  toggleTheme() {
    this.theme = this.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    this.setTheme(this.theme);
  }

  private setTheme(theme: Theme): void {
    document.documentElement.setAttribute(THEME_KEY, theme);
    localStorage.setItem(THEME_KEY, theme);
    this.setMaterialTheme(theme);
  }

  private setMaterialTheme(theme: Theme) {
    const cssClass = `app-mat-theme-${theme}`;
    const classList = this.overlayContainer.getContainerElement().classList;

    classList.contains(this.activeThemeCssClass) ?
      classList.replace(this.activeThemeCssClass, cssClass) :
      classList.add(cssClass);

    this.activeThemeCssClass = cssClass;
    this.theme$.next(theme);
  }
}
