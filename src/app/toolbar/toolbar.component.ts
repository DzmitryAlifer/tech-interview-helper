import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {Theme} from 'src/types';
import {AuthService} from '../service/auth.service';
import { DataService } from '../service/data.service';
import {ThemeService} from '../service/theme.service';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  readonly meetingLink = new FormControl('');
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly user$ = this.authService.authenticatedUser$;
  
  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly domSanitizer: DomSanitizer,
    private readonly themeService: ThemeService,
  ) {}

  openMeeting(): void {
    const securedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.meetingLink.value);
    this.dataService.sendUrl(securedUrl);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openTechs(): void {

  }

  signIn(): void {
    this.authService.googleAuth();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
