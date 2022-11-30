import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Theme} from 'src/types';
import {AuthService} from '../service/auth.service';
import {SettingsService} from '../service/settings.service';
import {ThemeService} from '../service/theme.service';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  isSettingsPanelOpen = false;
  readonly meetingLink = new FormControl('');
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly user$ = this.authService.authenticatedUser$;
  
  constructor(
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService,
    private readonly themeService: ThemeService,
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSettings(): void {
    this.settingsService.toggleSettings();
  }

  openTechs(): void {
    this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
  }

  signIn(): void {
    this.authService.googleAuth();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
