import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {DictionaryAnswer, Panel, TECHS_WITH_ICONS, Theme} from 'src/types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {RightSidePanelService} from '../service/right-side-panel.service';
import {ThemeService} from '../service/theme.service';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import * as appActions from '../store/app.actions';
import * as appSelectors from '../store/app.selectors';


const INITIAL_KNOWLEDGE_BASE_TECH = 'General';
const LIGHT_THEME_HIGHLIGHT_COLOR = 'yellow';
const DARK_THEME_HIGHLIGHT_COLOR = '#777700';


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
      this.store.select(settingsSelectors.selectEnabledTechs);
  private readonly selectedTech$ = new BehaviorSubject<string>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly allAnswers$: Observable<Map<string, DictionaryAnswer[]>> = 
      this.store.select(appSelectors.selectGroupedAnswers);

  private readonly selectedTechDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
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

  private readonly onNonEmptyAnswersWithTheme$: Observable<[DictionaryAnswer[], boolean]> = 
      combineLatest([this.sortedDictionaryAnswers$, this.isDarkTheme$])
        .pipe(filter(([answers,]) => !!answers.length));

  constructor(
    private readonly elementRef: ElementRef,
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
    private readonly themeService: ThemeService,
  ) {}

  ngAfterViewInit(): void {
    this.onNonEmptyAnswersWithTheme$.subscribe(([, isDarkTheme]) => {
      setTimeout(() => {
        this.elementRef.nativeElement.querySelectorAll('.answer i')
          .forEach((element: HTMLElement) => {
            element.style.backgroundColor = isDarkTheme ? 
                DARK_THEME_HIGHLIGHT_COLOR : 
                LIGHT_THEME_HIGHLIGHT_COLOR;
          });
      });
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

  openTopicPanel(): void {
    this.store.dispatch(appActions.setActivePanel({activePanel: Panel.TOPIC}));
    this.rightSidePanelService.toggle()
  }
}
