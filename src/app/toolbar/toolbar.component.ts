import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Theme} from 'src/types';
import {AuthService} from '../service/auth.service';
import {ThemeService} from '../service/theme.service';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly user$ = this.authService.authenticatedUser$;
  
  constructor(
    private readonly authService: AuthService,
    private readonly themeService: ThemeService,
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  signIn(): void {
    this.authService.googleAuth();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
