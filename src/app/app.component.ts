import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Panel, Theme} from 'src/types';
import {RightSidePanelService} from './service/right-side-panel.service';
import {ThemeService} from './service/theme.service';
import {selectActivePanel} from './store/app.selectors';
import * as appActions from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild('rightSidePanel') rightSidePanel!: MatSidenav;

  readonly Panel = Panel;
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly isOpenPanel$ = this.rightSidePanelService.isOpenPanel$;
  readonly activePanel$: Observable<Panel | null> = this.store.select(selectActivePanel);

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
    private readonly themeService: ThemeService,
  ) {
    this.store.dispatch(appActions.loadKnowledgeBase());

    this.isOpenPanel$.subscribe(isOpen => {
      isOpen ? this.rightSidePanel.open() : this.rightSidePanel.close();
    });
  }

  closeSidePanel(): void {
    this.rightSidePanelService.close();
  }
}
