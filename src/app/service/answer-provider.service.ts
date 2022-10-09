import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DictionaryAnswer {
  topic: string;
  dictionary: string[];
  answer: string;
}

@Injectable({providedIn: 'root'})
export class AnswerProviderService {

  constructor(private readonly http: HttpClient) {}

  getAllJsDictionaryAnswers(): Observable<Map<string, DictionaryAnswer>> {
    return this.http.get('assets/js/answers.csv', {responseType: 'text'}).pipe(
      map(data => {
        const dictionaryAnswers = new Map<string, DictionaryAnswer>();
        const csvToRowArray = data.split('\n');
        
        for (let index = 1; index < csvToRowArray.length; index++) {
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
