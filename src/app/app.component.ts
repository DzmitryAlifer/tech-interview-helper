import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoiceRecognitionService } from './service/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  text = this.voiceRecognitionService.text;

  constructor(private readonly voiceRecognitionService : VoiceRecognitionService) {
    this.voiceRecognitionService.init();
  }

  startService(){
    this.voiceRecognitionService.start();
  }

  stopService(){
    this.voiceRecognitionService.stop();
  }
}
