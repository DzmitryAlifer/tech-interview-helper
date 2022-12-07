import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
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

    return staticAnswers.pipe(
      map(data => csvDataToDictionaryAnswers(tech, data)),
    );
  }

  getAllStaticAnswers2(): Observable<DictionaryAnswer[]> {
    return of(this.allTechs).pipe(
      switchMap(allTechs => 
        forkJoin(allTechs.map(tech => this.getAllAnswersForTech2(tech)))),
      map(answers => answers.flat()),
    );
  }

  getAllAnswers2(): Observable<DictionaryAnswer[]> {
    return combineLatest([this.getAllStaticAnswers2(), getDictionaryAnswers()])
        .pipe(map(allAnswers => allAnswers.flat()));
  }

  getAllAnswersGroupedByTech2(): Observable<Map<string, DictionaryAnswer[]>> {
    return this.getAllAnswers2().pipe(
      map(dictionaryAnswers => dictionaryAnswers.reduce((map, dictionaryAnswer) => {
        const techDictionaryAnswers = map.get(dictionaryAnswer.tech) ?? [];
        techDictionaryAnswers.push(dictionaryAnswer);
        map.set(dictionaryAnswer.tech, techDictionaryAnswers);
        return map;
      }, new Map<string, DictionaryAnswer[]>())),
    );
  }

  private getAllAnswersForTech2(tech: Tech|string): Observable<DictionaryAnswer[]> {
    return this.http.get(`assets/${tech}.csv`, {responseType: 'text'})
        .pipe(map(data => csvDataToDictionaryAnswers2(tech, data)));
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

function csvDataToDictionaryAnswers2(tech: Tech|string, csvData: string): DictionaryAnswer[] {
  const dictionaryAnswers: DictionaryAnswer[] = [];
  const csvToRowArray = csvData.split('\n').filter(Boolean);

  for (let index = 1; index < csvToRowArray.length; index++) {
    const row = csvToRowArray[index].split(',');
    const topic = row[0];
    const dictionary = row[1].split(' ');
    const answer = row[2];
    dictionaryAnswers.push({tech, topic, dictionary, answer});
  }

  return dictionaryAnswers;
}
