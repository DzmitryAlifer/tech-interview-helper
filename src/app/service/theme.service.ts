import { Injectable } from '@angular/core';
import { Theme } from 'src/types';


const THEME_KEY = 'theme';


@Injectable({providedIn: 'root'})
export class ThemeService {
  getTheme(): Theme {
    const theme = localStorage.getItem(THEME_KEY) as Theme ?? Theme.LIGHT;
    this.setTheme(theme);
    return theme;
  }

  setTheme(theme: Theme): void {
    document.documentElement.setAttribute(THEME_KEY, theme);
    localStorage.setItem(THEME_KEY, theme);
  }
}
