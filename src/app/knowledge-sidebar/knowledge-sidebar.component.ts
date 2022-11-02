import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { DictionaryAnswer, Tech } from 'src/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AnswerProviderService } from '../service/answer-provider.service';
import { SelectedTechService } from '../service/selected-tech.service';


const INITIAL_KNOWLEDGE_BASE_TECH = Tech.CSS;


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar {
  readonly techs = Object.values(Tech);
  readonly selectedTech$ = new BehaviorSubject<Tech>(INITIAL_KNOWLEDGE_BASE_TECH);
  readonly allAnswers$ = this.answerProviderService.getAllAnswers();
  
  readonly selectedTechKnowledgeBase$: Observable<Map<string, DictionaryAnswer>> = this.selectedTech$.pipe(
    withLatestFrom(this.allAnswers$),
    map(([selectedTech, allAnswers]) => {
      const matchedTechAnswers = allAnswers.find(answers => {
        const techTopics = Array.from(answers.keys());
        return !!techTopics.length && techTopics[0].split(':')[0] === selectedTech;
      })
      return matchedTechAnswers ?? new Map();
    }),
  );

  constructor(
    private readonly answerProviderService: AnswerProviderService,
    private readonly selectedTechService: SelectedTechService,
  ) {}

  selectTech(tech: Tech): void {
    this.selectedTech$.next(tech);
  }
}
