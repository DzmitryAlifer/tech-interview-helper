import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoiceRecognitionService } from './service/voice-recognition.service';
import { BehaviorSubject } from 'rxjs';
import { DictionaryAnswer } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly allAnswers: DictionaryAnswer[][] = [];
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[][]>([]); 

  constructor(private readonly voiceRecognitionService : VoiceRecognitionService) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allDictionaryAnswers$.next(this.allAnswers);
    });
  }

  startVoiceRecognition(){
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(){
    this.voiceRecognitionService.stop();
  }
}
