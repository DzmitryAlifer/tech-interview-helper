import { Injectable } from '@angular/core';
import { JS_DICTIONARY } from '../../dictionary/js'; 

declare var webkitSpeechRecognition: any

@Injectable({providedIn: 'root'})
export class VoiceRecognitionService {
  recognition =  new webkitSpeechRecognition();
  
  isStopped = false;
  public text = '';
  tempWords : any;

  constructor() { }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      console.log(e);
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
      const pronouncedWords = transcript.split(' ');
      const matchedAnswers: string[] = Array.from(JS_DICTIONARY.values())
        .filter(dictionaryAnswer => hasMatchedWord(pronouncedWords, dictionaryAnswer.dictionary))
        .map(({answer}) => answer);
      console.log(matchedAnswers);
    });
  }

  start() {
    this.isStopped = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStopped) {
        this.recognition.stop();
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStopped = true;
    this.wordConcat();
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}

function hasMatchedWord(left: string[], right: string[]): boolean {
  return left.some(word => right.includes(word));
}
