import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DictionaryAnswer, Tech } from 'src/types';
import { SelectedTechService } from './selected-tech.service';



@Injectable({providedIn: 'root'})
export class AnswerProviderService {

  constructor(
    private readonly http: HttpClient,
    private readonly selectedTechService: SelectedTechService,
  ) {}

  getAllDictionaryAnswers(): Observable<Map<string, DictionaryAnswer>[]> {
    return this.selectedTechService.getSelectedTechs().pipe(
      switchMap(selectedTechs => 
        forkJoin(selectedTechs.map(tech => this.getAllDictionaryAnswersForTech(tech)))));
  }

  private getAllDictionaryAnswersForTech(tech: Tech): Observable<Map<string, DictionaryAnswer>> {
    return this.http.get(`assets/${tech}.csv`, {responseType: 'text'}).pipe(
      map(data => csvDataToDictionaryAnswers(data)),
    );
  }
}

function csvDataToDictionaryAnswers(csvData: string): Map<string, DictionaryAnswer> {
  const dictionaryAnswers = new Map<string, DictionaryAnswer>();
  const csvToRowArray = csvData.split('\n');

  for (let index = 1; index < csvToRowArray.length; index++) {
    const row = csvToRowArray[index].split(',');
    const topic = row[0];
    const dictionary = row[1].split(' ');
    const answer = row[2];
    dictionaryAnswers.set(topic, { topic, dictionary, answer });
  }

  return dictionaryAnswers;
}
