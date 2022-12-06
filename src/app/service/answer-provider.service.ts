import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DictionaryAnswer, Tech} from 'src/types';
import {SelectedTechService} from './selected-tech.service';
import {getDictionaryAnswers} from '../service/firebase';


@Injectable({providedIn: 'root'})
export class AnswerProviderService {
  private readonly allTechs: Tech[] = Object.values(Tech);

  constructor(
    private readonly http: HttpClient,
    private readonly selectedTechService: SelectedTechService,
  ) {}

  getAllAnswers(): Observable<Map<string, DictionaryAnswer>[]> {
    return of(this.allTechs).pipe(
      switchMap(allTechs => 
        forkJoin(allTechs.map(tech => this.getAllDictionaryAnswersForTech(tech)))),
    );
  }

  getAllDictionaryAnswers(): Observable<Map<string, DictionaryAnswer>[]> {
    return this.selectedTechService.getSelectedTechs().pipe(
      switchMap(selectedTechs => 
        forkJoin(selectedTechs.map(tech => this.getAllDictionaryAnswersForTech(tech)))));
  }

  private getAllDictionaryAnswersForTech(tech: Tech|string): Observable<Map<string, DictionaryAnswer>> {
    const staticAnswers = this.http.get(`assets/${tech}.csv`, { responseType: 'text' });
    const datastoreAnswers = getDictionaryAnswers(tech);

    return staticAnswers.pipe(
      map(data => csvDataToDictionaryAnswers(tech, data)),
    );
  }
}

function csvDataToDictionaryAnswers(tech: Tech |string, csvData: string): Map<string, DictionaryAnswer> {
  const dictionaryAnswers = new Map<string, DictionaryAnswer>();
  const csvToRowArray = csvData.split('\n').filter(Boolean);

  for (let index = 1; index < csvToRowArray.length; index++) {
    const row = csvToRowArray[index].split(',');
    const topic = row[0];
    const dictionary = row[1].split(' ');
    const answer = row[2];
    dictionaryAnswers.set(`${tech}:${topic}`, {tech, topic, dictionary, answer});
  }

  return dictionaryAnswers;
}
