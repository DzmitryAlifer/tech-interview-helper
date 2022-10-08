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
  allAnswers: string[] = [];
  // readonly answers$: Observable<string[]> = this.voiceRecognitionService.getAnswers();
  readonly allAnswers$ = new BehaviorSubject<string[]>(['answer1', 'answer2']); 

  constructor(private readonly voiceRecognitionService : VoiceRecognitionService) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
    });
  }

  startVoiceRecognition(){
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(){
    this.voiceRecognitionService.stop();
  }
}
