import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DictionaryAnswer } from 'src/types';


const SIZE_STEP_PX = 16;


@Component({
  selector: 'recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recognition {
  fontSizePx = 16;
  answerCardWidthPx = 400;
  private allAnswers: DictionaryAnswer[][] = [];
  readonly pronouncedText$: Observable<string> = this.voiceRecognitionService.getPronouncedText();
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[][]>([]);

  constructor(private readonly voiceRecognitionService: VoiceRecognitionService) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allDictionaryAnswers$.next(this.allAnswers);
    });
  }

  startVoiceRecognition() {
    this.voiceRecognitionService.start();
  }

  stopVoiceRecognition() {
    this.voiceRecognitionService.stop();
  }

  cleanup(): void {
    this.allAnswers = [];
    this.allDictionaryAnswers$.next([]);
  }

  decreaseText(): void {
    this.fontSizePx--;
  }
  
  increaseText(): void {
    this.fontSizePx++;
  }

  squeezeCard(): void {
    this.answerCardWidthPx -= SIZE_STEP_PX;
  }

  widenCard(): void {
    this.answerCardWidthPx += SIZE_STEP_PX;
  }
}
