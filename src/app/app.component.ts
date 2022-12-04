import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SafeResourceUrl} from '@angular/platform-browser';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryAnswer, Theme} from 'src/types';
import {DataService} from './service/data.service';
import {RightSidePanelService} from './service/right-side-panel.service';
import {ThemeService} from './service/theme.service';
import {VoiceRecognitionService} from './service/voice-recognition.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild('rightSidePanel') rightSidePanel!: MatSidenav;

  private allAnswers: DictionaryAnswer[][] = [];
  readonly pronouncedText$: Observable<string> = this.voiceRecognitionService.getPronouncedText();
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[][]>([]); 
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly meetingUrl$: Observable<SafeResourceUrl> = this.dataService.getUrl();
  readonly isOpenPanel$ = this.rightSidePanelService.isOpenPanel$;
  
  constructor(
    private readonly dataService: DataService,
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly themeService: ThemeService,
    private readonly voiceRecognitionService : VoiceRecognitionService,
  ) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allDictionaryAnswers$.next(this.allAnswers);
    });

    this.isOpenPanel$.subscribe(isOpen => {
      isOpen ? this.rightSidePanel.open() : this.rightSidePanel.close();
    });
  }

  startVoiceRecognition(){
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(){
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
