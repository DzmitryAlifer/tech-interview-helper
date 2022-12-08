import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {combineLatest, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryAnswer, TopicDeleteForm} from 'src/types';
import {RightSidePanelService} from '../service/right-side-panel.service';
import * as topicPanelActions from './store/topic-panel.actions';
import * as appSelectors from '../store/app.selectors';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'topic-delete-form',
  templateUrl: './topic-delete-form.component.html',
  styleUrls: ['./topic-delete-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicDeleteFormComponent {
  readonly techs$: Observable<string[]> =
      this.store.select(settingsSelectors.selectEnabledTechs);
  private readonly selectedTech$ = new Subject<string>();
  private readonly groupedAnswers$: Observable<Map<string, DictionaryAnswer[]>> = 
      this.store.select(appSelectors.selectGroupedAnswers);
  readonly dictionaryAnswers$: Observable<DictionaryAnswer[]> = 
      combineLatest([this.groupedAnswers$, this.selectedTech$]).pipe(
        map(([groupedAnswers, selectedTech]) => groupedAnswers.get(selectedTech) ?? []));

  readonly techField = new FormControl('');
  readonly topicField = new FormControl('');
  
  readonly topicDeleteForm = new FormGroup<TopicDeleteForm>({
    techField: this.techField,
    topicField: this.topicField,
  });

  constructor(
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}

  onTechSelect({value}: MatSelectChange): void {
    this.selectedTech$.next(value);
  }
}
