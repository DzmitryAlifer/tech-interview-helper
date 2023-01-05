import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {VoiceRecognitionService} from '../service/voice-recognition.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DictionaryAnswer} from 'src/types';
import {highlight} from '../common';
import {Settings} from '../settings-panel/state/settings.reducers';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';


const INITIAL_ANSWER_CARD_WIDTH_PX = 400;
const ANSWER_CARD_WIDTH_STEP_PX = 16;
const INITIAL_FONT_SIZE_PX = 16;


@Component({
  selector: 'recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recognition implements AfterViewInit {
  fontSizePx = INITIAL_FONT_SIZE_PX;
  answerCardWidthPx = INITIAL_ANSWER_CARD_WIDTH_PX;
  private allAnswers: DictionaryAnswer[] = [];
  readonly pronouncedText$: Observable<string> = this.voiceRecognitionService.getPronouncedText();
  readonly allDictionaryAnswers$ = new BehaviorSubject<DictionaryAnswer[]>([]);
  private readonly highlightColors$: Observable<Partial<Settings>> = 
      this.store.select(settingsSelectors.selectHighlightColors);

  constructor(
    private readonly elementRef: ElementRef,
    private readonly store: Store,
    private readonly voiceRecognitionService: VoiceRecognitionService,
  ) {
    this.voiceRecognitionService.getAnswers().subscribe(answers => {
      this.allAnswers.unshift(...answers);
      this.allDictionaryAnswers$.next(this.allAnswers);
    });
  }

  ngAfterViewInit(): void {
    this.highlightColors$.subscribe(highlightColors => {
      highlight(this.elementRef, '.answer i', highlightColors);
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