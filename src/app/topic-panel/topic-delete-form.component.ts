import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {combineLatest, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryAnswer, EnabledTopics, TopicDeleteForm} from 'src/types';
import {RightSidePanelService} from '../service/right-side-panel.service';
import * as appActions from '../store/app.actions';
import * as appSelectors from '../store/app.selectors';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import {MatSelectChange} from '@angular/material/select';
import * as topicPanelActions from './store/topic-panel.actions';


@Component({
  selector: 'topic-delete-form',
  templateUrl: './topic-delete-form.component.html',
  styleUrls: ['./topic-delete-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicDeleteFormComponent implements OnInit {
  readonly techs$: Observable<string[]> =
      this.store.select(settingsSelectors.selectEnabledNonEmptyTechs);
  readonly selectedTech$ = new Subject<string>();
  private readonly groupedAnswers$: Observable<Map<string, DictionaryAnswer[]>> = 
      this.store.select(appSelectors.selectCustomGroupedAnswers);
  private readonly initialDictionaryAnswers$: Observable<DictionaryAnswer[]> = 
      combineLatest([this.groupedAnswers$, this.selectedTech$]).pipe(
        map(([groupedAnswers, selectedTech]) => groupedAnswers.get(selectedTech) ?? []));
  private readonly updatedDictionaryAnswers$ = new ReplaySubject<DictionaryAnswer[]>();
  readonly dictionaryAnswers$: Observable<DictionaryAnswer[]> = 
      merge(this.initialDictionaryAnswers$, this.updatedDictionaryAnswers$);

  readonly techField = new FormControl('');
  readonly enabledTopicsFields = new FormGroup<EnabledTopics>({});
  
  readonly topicDeleteForm = new FormGroup<TopicDeleteForm>({
    techField: this.techField,
    enabledTopicsFields: this.enabledTopicsFields,
  });

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}
  
  ngOnInit(): void {
    this.dictionaryAnswers$.subscribe(dictionaryAnswers => {
      dictionaryAnswers.forEach(dictionaryAnswer => {
        const isAnswerEnabledControl = new FormControl<boolean>(dictionaryAnswer.isEnabled !== false);
        this.enabledTopicsFields.setControl(dictionaryAnswer.topic, isAnswerEnabledControl);
      });
    });

    this.store.dispatch(appActions.loadCustomKnowledgeBase());
  }

  onTechSelect({value}: MatSelectChange): void {
    this.selectedTech$.next(value);
  }

  toggleMarkForDelete(dictionaryAnswers: DictionaryAnswer[], index: number): void {
    dictionaryAnswers[index] = {
      ...dictionaryAnswers[index],
      isMarkedForDelete: !dictionaryAnswers[index].isMarkedForDelete
    };
    this.updatedDictionaryAnswers$.next(dictionaryAnswers);
  }

  saveEnabledAnswers(dictionaryAnswers: DictionaryAnswer[]): void {
    const tech = this.topicDeleteForm.value.techField!;
    const enabledTopics = this.topicDeleteForm.value.enabledTopicsFields!;
    this.store.dispatch(topicPanelActions.updateTechDictionaryAnswers({tech, enabledTopics, dictionaryAnswers}));
    this.rightSidePanelService.close();
    this.selectedTech$.next('');
    this.topicDeleteForm.reset();
  }
}
