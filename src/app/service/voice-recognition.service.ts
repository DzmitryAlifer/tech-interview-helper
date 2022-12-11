import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
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
    shareReplay(1),
  );

  private readonly answers$: Observable<DictionaryAnswer[][]> = this.pronouncedWords$.pipe(
    withLatestFrom(this.allDictionaryAnswers$),
    map(([pronouncedWords, allDictionaryAnswers]) => 
        allDictionaryAnswers.map(dictionaryAnswers => getRecognizedDictionaryAnswers(pronouncedWords, dictionaryAnswers))),
  );

  constructor(private readonly answerProviderService: AnswerProviderService) {}

  getPronouncedText(): Observable<string> {
    return this.pronouncedWords$.pipe(map(words => words.join(' ').toLocaleLowerCase()));
  }

  getAnswers(): Observable<DictionaryAnswer[]> {
    return this.answers$.pipe(mergeMap(answers => answers));
  }

  start() {
    this.recognition.stop();
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}

function hasMatchedWord(left: string[], right: string[]): boolean {
  return left.some(word => right.includes(word.toLocaleLowerCase()));
}

function getRecognizedDictionaryAnswers(pronouncedWords: string[], dictionaryMap: Map<string, DictionaryAnswer>): DictionaryAnswer[] {
  return Array.from(dictionaryMap.values())
      .filter(dictionaryAnswer => hasMatchedWord(pronouncedWords, dictionaryAnswer.dictionary));
}
