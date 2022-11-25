import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Theme } from 'src/types';
import { AuthService } from '../service/auth.service';
import { ThemeService } from '../service/theme.service';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  isDarkTheme = this.themeService.getTheme() === Theme.DARK;
  readonly user$ = this.authService.authenticatedUser$.pipe(tap(console.log));

  constructor(
    private readonly authService: AuthService,
    private readonly themeService: ThemeService,
  ) {}

  signIn(): void {
    this.authService.googleAuth();
  }

  signOut(): void {
    this.authService.signOut();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme ? Theme.DARK : Theme.LIGHT);
  }

}
