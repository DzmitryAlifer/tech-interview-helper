import {ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {DictionaryAnswer, Tech} from 'src/types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AnswerProviderService} from '../service/answer-provider.service';
import {SettingsService} from '../service/settings.service';


const INITIAL_KNOWLEDGE_BASE_TECH = Tech.CSS;


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar {
  @ViewChildren('details') detailsElements!: QueryList<ElementRef>;
  
  readonly techs: Tech[] = this.settingsService.getEnabledTechs();
  private readonly selectedTech$ = new BehaviorSubject<Tech>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly allAnswers$ = this.answerProviderService.getAllAnswers();
  
  readonly selectedTechKnowledgeBase$: Observable<Map<string, DictionaryAnswer>> = 
    combineLatest([this.selectedTech$, this.allAnswers$]).pipe(
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
    private readonly settingsService: SettingsService,
  ) {}

  selectTech(tech: Tech): void {
    this.selectedTech$.next(tech);
  }

  expandAll(): void {
    this.detailsElements.forEach(details => details.nativeElement.setAttribute('open', ''));
  }

  collapseAll(): void {
    this.detailsElements.forEach(details => details.nativeElement.removeAttribute('open'));
  }
}
