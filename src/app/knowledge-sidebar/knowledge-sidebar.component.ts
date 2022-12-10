import {ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {DictionaryAnswer, Panel} from 'src/types';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import { map, tap, withLatestFrom} from 'rxjs/operators';
import {RightSidePanelService} from '../service/right-side-panel.service';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import * as appActions from '../store/app.actions';
import * as appSelectors from '../store/app.selectors';


const INITIAL_KNOWLEDGE_BASE_TECH = 'General';


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar {
  @ViewChildren('details') detailsElements!: QueryList<ElementRef>;
  
  private isAlphabeticallySorted = false;
  private readonly isAlphabeticallySorted$ = new BehaviorSubject<boolean>(false);
  readonly enabledTechs$: Observable<string[]> = 
      this.store.select(settingsSelectors.selectEnabledTechs);
  private readonly selectedTech$ = new BehaviorSubject<string>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly allAnswers$: Observable<Map<string, DictionaryAnswer[]>> = 
      this.store.select(appSelectors.selectGroupedAnswers);

  readonly selectedTechDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
    combineLatest([this.selectedTech$, this.allAnswers$])
        .pipe(map(([tech, allAnswers]) => allAnswers.get(tech) ?? []));

  readonly sortedDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
    combineLatest([this.isAlphabeticallySorted$, this.selectedTechDictionaryAnswers$]).pipe(
      map(([isAlphabeticallySorted, dictionaryAnswers]) => 
        isAlphabeticallySorted ? 
          dictionaryAnswers.slice().sort((left, right) => 
              left.topic.toLocaleLowerCase().localeCompare(right.topic.toLocaleLowerCase())) : 
          dictionaryAnswers),
    );

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}

  selectTech(tech: string): void {
    this.selectedTech$.next(tech);
  }

  toggleSorting(): void {
    this.isAlphabeticallySorted$.next(!this.isAlphabeticallySorted$.getValue());
  }

  expandAll(): void {
    this.detailsElements.forEach(details => details.nativeElement.setAttribute('open', ''));
  }

  collapseAll(): void {
    this.detailsElements.forEach(details => details.nativeElement.removeAttribute('open'));
  }

  openTopicPanel(): void {
    this.store.dispatch(appActions.setActivePanel({activePanel: Panel.TOPIC}));
    this.rightSidePanelService.toggle()
  }
}
