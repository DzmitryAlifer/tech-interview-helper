import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AnswerProviderService } from './answer-provider.service';
import { DictionaryAnswer } from 'src/types';


declare var webkitSpeechRecognition: any;


@Injectable({providedIn: 'root'})
export class VoiceRecognitionService {
  isStopped = false;
  recognition = new webkitSpeechRecognition();
  private readonly allDictionaryAnswers$: Observable<Map<string, DictionaryAnswer>[]> = 
    this.answerProviderService.getAllDictionaryAnswers();

  private readonly pronouncedWords$: Observable<string[]> = fromEvent(this.recognition, 'result').pipe(
    map(({results}: any) => Array.from(results)[0]),
    filter((result: any) => result.isFinal),
    map((result: any) => result[0].transcript.split(' ')),
  );

  private readonly answers$: Observable<string[]> = this.pronouncedWords$.pipe(
    tap(console.log),
    withLatestFrom(this.allDictionaryAnswers$),
    map(([pronouncedWords, allDictionaryAnswers]) => Array.from(jsDictionaryAnswers.values())
          .filter(dictionaryAnswer => hasMatchedWord(pronouncedWords, dictionaryAnswer.dictionary))),
    map(matchedDictionaryAnswers => matchedDictionaryAnswers.map(dictionaryAnswer => dictionaryAnswer.answer)),
  );

  constructor(private readonly answerProviderService: AnswerProviderService) {}

  getAnswers(): Observable<string[]> {
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
  return left.some(word => right.includes(word.toLocaleLowerCase()));
}
