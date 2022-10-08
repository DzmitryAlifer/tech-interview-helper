import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoiceRecognitionService } from './service/voice-recognition.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly answers$: Observable<string[]> = this.voiceRecognitionService.getAnswers();

  constructor(private readonly voiceRecognitionService : VoiceRecognitionService) {}

  startVoiceRecognition(){
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition(){
    this.voiceRecognitionService.stop();
  }
}
