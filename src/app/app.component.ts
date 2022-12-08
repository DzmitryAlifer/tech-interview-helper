import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Store} from '@ngrx/store'
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryAnswer, Panel, Theme} from 'src/types';
import {DataService} from './service/data.service';
import {RightSidePanelService} from './service/right-side-panel.service';
import {ThemeService} from './service/theme.service';
import {VoiceRecognitionService} from './service/voice-recognition.service';
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
  private allAnswers: DictionaryAnswer[][] = [];
  readonly pronouncedText$: Observable<string> = this.voiceRecognitionService.getPronouncedText();
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[][]>([]); 
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly meetingUrl$: Observable<SafeResourceUrl> = this.dataService.getUrl();
  readonly isOpenPanel$ = this.rightSidePanelService.isOpenPanel$;
  readonly activePanel$: Observable<Panel | null> = this.store.select(selectActivePanel);

  constructor(
    private readonly dataService: DataService,
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
    private readonly themeService: ThemeService,
    private readonly voiceRecognitionService : VoiceRecognitionService,
  ) {
    this.store.dispatch(appActions.loadKnowledgeBase());

    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allDictionaryAnswers$.next(this.allAnswers);
    });

    this.isOpenPanel$.subscribe(isOpen => {
      isOpen ? this.rightSidePanel.open() : this.rightSidePanel.close();
    });
  }

  startVoiceRecognition(): void {
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(): void {
    this.voiceRecognitionService.stop();
  }

  cleanup(): void {
    this.allAnswers = [];
    this.allDictionaryAnswers$.next([]);
  }

  closeSidePanel(): void {
    this.rightSidePanelService.close();
  }
}
