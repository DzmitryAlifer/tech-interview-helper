import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DictionaryAnswer, Tech} from 'src/types';
import {SelectedTechService} from './selected-tech.service';
import {getUserDictionaryAnswers} from '../service/firebase';


@Injectable({providedIn: 'root'})
export class AnswerProviderService {
  private readonly allTechs: Tech[] = Object.values(Tech);

  private allAnswers$: Observable<DictionaryAnswer[]> = 
    combineLatest([this.getAllStaticAnswers2(), getUserDictionaryAnswers()])
      .pipe(map(allAnswers => allAnswers.flat()));

  private allTechs$: Observable<string[]> = this.allAnswers$.pipe(
    map(dictionaryAnswers => dictionaryAnswers.map(({ tech }) => tech)),
    map(techs => [... new Set(techs)]),
  ); 

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

  private getAllDictionaryAnswersForTech(tech: string): Observable<Map<string, DictionaryAnswer>> {
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
    return this.allAnswers$;
  }

  getAllGoldDataAnswers(): Observable<DictionaryAnswer[]> {
    return this.getAllStaticAnswers2();
  }

  getAllCustomAnswers(): Observable<DictionaryAnswer[]> {
    return getUserDictionaryAnswers();
  }

  getAllTechs2(): Observable<string[]> {
    return this.allTechs$;
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

  private getAllAnswersForTech2(tech: string): Observable<DictionaryAnswer[]> {
    return this.http.get(`assets/${tech}.csv`, {responseType: 'text'})
        .pipe(map(data => csvDataToDictionaryAnswers2(tech, data)));
  }
}

function csvDataToDictionaryAnswers(tech: string, csvData: string): Map<string, DictionaryAnswer> {
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

function csvDataToDictionaryAnswers2(tech: string, csvData: string): DictionaryAnswer[] {
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
