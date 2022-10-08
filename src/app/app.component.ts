import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoiceRecognitionService } from './service/voice-recognition.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly allAnswers: string[] = [];
  readonly allAnswers$ = new BehaviorSubject<string[]>([]); 

  constructor(private readonly voiceRecognitionService : VoiceRecognitionService) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allAnswers$.next(this.allAnswers);
    });
  }

  startVoiceRecognition(){
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(){
    this.voiceRecognitionService.stop();
  }
}
