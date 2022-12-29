import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {DictionaryAnswer, Panel, TECHS_WITH_ICONS, Theme} from 'src/types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import {ThemeService} from '../service/theme.service';
import {Settings} from '../settings-panel/state/settings.reducers';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import * as appSelectors from '../store/app.selectors';
import {highlight, selectFontSize} from '../common';


const INITIAL_KNOWLEDGE_BASE_TECH = 'General';


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar implements AfterViewInit {
  @ViewChildren('details') detailsElements!: QueryList<ElementRef>;
  
  readonly TECHS_WITH_ICONS = TECHS_WITH_ICONS;
  readonly isAlphabeticallySorted$ = new BehaviorSubject<boolean>(false);
  readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === Theme.DARK));
  readonly enabledTechs$: Observable<string[]> = 
      this.store.select(settingsSelectors.selectEnabledNonEmptyTechs);
  private readonly selectedTech$ = new BehaviorSubject<string>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly allAnswers$: Observable<Map<string, DictionaryAnswer[]>> = 
      this.store.select(appSelectors.selectGroupedAnswers);
  private readonly highlightColors$: Observable<Partial<Settings>> = 
      this.store.select(settingsSelectors.selectHighlightColors);
  private readonly fontSize$: Observable<number> = 
      this.store.select(settingsSelectors.selectFontSize);

  private readonly selectedTechDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
    combineLatest([this.selectedTech$, this.allAnswers$]).pipe(
        map(([tech, allAnswers]) => allAnswers.get(tech) ?? []),
        map(dictionaryAnswers => dictionaryAnswers.filter(({isEnabled}) => isEnabled !== false)),
    );

  readonly sortedDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
    combineLatest([this.isAlphabeticallySorted$, this.selectedTechDictionaryAnswers$]).pipe(
      map(([isAlphabeticallySorted, dictionaryAnswers]) => 
        isAlphabeticallySorted ? 
          dictionaryAnswers.slice().sort((left, right) => 
              left.topic.toLocaleLowerCase().localeCompare(right.topic.toLocaleLowerCase())) : 
          dictionaryAnswers),
    );

  private readonly onNonEmptyAnswers$: Observable<[DictionaryAnswer[], Partial<Settings>, number]> = 
      combineLatest([this.sortedDictionaryAnswers$, this.highlightColors$, this.fontSize$]).pipe(
        debounceTime(0),
        filter(([answers]) => !!answers.length),
      );

  constructor(
    private readonly elementRef: ElementRef,
    private readonly store: Store,
    private readonly themeService: ThemeService,
  ) {}

  ngAfterViewInit(): void {
    this.onNonEmptyAnswers$.subscribe(([, highlightColors, fontSize]) => {
      highlight(this.elementRef, '.answer i', highlightColors);
      selectFontSize(this.elementRef, 'summary', fontSize);
      selectFontSize(this.elementRef, '.answer', fontSize);
    });
  }

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
}
