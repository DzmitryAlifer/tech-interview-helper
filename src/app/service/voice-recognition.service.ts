import { Injectable } from '@angular/core';
import { JS_DICTIONARY } from '../../dictionary/js';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

declare var webkitSpeechRecognition: any

@Injectable({providedIn: 'root'})
export class VoiceRecognitionService {
  isStopped = false;
  recognition = new webkitSpeechRecognition();

  private readonly answers$: Observable<string[]> = fromEvent(this.recognition, 'result').pipe(
    map(({results}: any) => Array.from(results)[0]),
    filter((result: any) => result.isFinal),
    map((result: any) => result[0].transcript.split(' ')),
    map(pronouncedWords => Array.from(JS_DICTIONARY.values())
        .filter(dictionaryAnswer => hasMatchedWord(pronouncedWords, dictionaryAnswer.dictionary))
        .map(({answer}) => answer)),
  );

  init() {
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.answers$.subscribe(answers => {
      console.log(answers);
    });
  }

  getAnswers(): Observable<string[]> {
    return this.answers$;
  }

  start() {
    // this.isStopped = false;
    this.recognition.start();
    // this.recognition.addEventListener('end', (condition:any) => {
    //   if (this.isStopped) {
    //     this.recognition.stop();
    //   } else {
    //     this.recognition.start();
    //   }
    // });
  }

  stop() {
    // this.isStopped = true;
    this.recognition.stop();
  }
}

function hasMatchedWord(left: string[], right: string[]): boolean {
  return left.some(word => right.includes(word));
}
