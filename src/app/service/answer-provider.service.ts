import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictionaryAnswer } from 'src/dictionary/js';

@Injectable({providedIn: 'root'})
export class AnswerProviderService {

  constructor(private readonly http: HttpClient) {}

  getAllJsDictionaryAnswers(): Observable<Map<string, DictionaryAnswer>> {
    return this.http.get('assets/js/answers.csv', {responseType: 'text'}).pipe(
      map(data => {
        const dictionaryAnswers = new Map<string, DictionaryAnswer>();
        const csvToRowArray = data.split('\n');
        
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          const row = csvToRowArray[index].split(',');
          const topic = row[0];
          const dictionary = row[1].split(' ');
          const answer = row[2];
          dictionaryAnswers.set(topic, {topic, dictionary, answer});
        }
        
        return dictionaryAnswers;
      }),
    );
  }
}
