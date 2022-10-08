import { Injectable } from '@angular/core';
import { JS_DICTIONARY } from '../../dictionary/js';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AnswerProviderService } from './answer-provider.service';

declare var webkitSpeechRecognition: any

@Injectable({providedIn: 'root'})
export class VoiceRecognitionService {
  isStopped = false;
  recognition = new webkitSpeechRecognition();
  private readonly jsDictionaryAnswers$ = this.answerProviderService.getAllJsDictionaryAnswers();
  
  private readonly pronouncedTopics$: Observable<string[]> = fromEvent(this.recognition, 'result').pipe(
    map(({results}: any) => Array.from(results)[0]),
    filter((result: any) => result.isFinal),
    map((result: any) => result[0].transcript.split(' ')),
    map(pronouncedWords => Array.from(JS_DICTIONARY.values())
        .filter(dictionaryAnswer => hasMatchedWord(pronouncedWords, dictionaryAnswer.dictionary))
        .map(({topic}) => topic)),
  );

  private readonly answers$: Observable<(string|undefined)[]> = this.pronouncedTopics$.pipe(
    withLatestFrom(this.jsDictionaryAnswers$),
    map(([pronouncedTopics, jsDictionaryAnswers]) => 
        pronouncedTopics.map(topic => jsDictionaryAnswers.get(topic))
            .filter(Boolean)
            .map(dictionaryAnswer => dictionaryAnswer?.answer)),
  );

  constructor(private readonly answerProviderService: AnswerProviderService) { }

  getAnswers(): Observable<(string | undefined)[]> {
    return this.answers$;
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}

function hasMatchedWord(left: string[], right: string[]): boolean {
  return left.some(word => right.includes(word));
}
