import {ChangeDetectionStrategy, Component} from '@angular/core';
import {VoiceRecognitionService} from '../service/voice-recognition.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DictionaryAnswer} from 'src/types';


const INITIAL_ANSWER_CARD_WIDTH_PX = 400;
const ANSWER_CARD_WIDTH_STEP_PX = 16;
const INITIAL_FONT_SIZE_PX = 16;


@Component({
  selector: 'recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recognition {
  fontSizePx = INITIAL_FONT_SIZE_PX;
  answerCardWidthPx = INITIAL_ANSWER_CARD_WIDTH_PX;
  private allAnswers: DictionaryAnswer[] = [];
  readonly pronouncedText$: Observable<string> = this.voiceRecognitionService.getPronouncedText();
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[]>([]);

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
    this.answerCardWidthPx -= ANSWER_CARD_WIDTH_STEP_PX;
  }

  widenCard(): void {
    this.answerCardWidthPx += ANSWER_CARD_WIDTH_STEP_PX;
  }

  removeAnswer(dictionaryAnswers: DictionaryAnswer[], answerToRemove: DictionaryAnswer): void {
    const updatedDictionaryAnswers = dictionaryAnswers.filter(({tech, topic}) => 
        tech !== answerToRemove.tech || topic !== answerToRemove.topic);
    this.allDictionaryAnswers$.next(updatedDictionaryAnswers);
  }
}