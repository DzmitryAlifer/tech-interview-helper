import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Store} from '@ngrx/store';
import {combineLatest, merge, Observable, ReplaySubject} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import {INPUT_DEBOUNCE_TIME, MAX_ANSWER_LENGTH, MAX_ASSOCIATED_KEYWORDS, MAX_TOPIC_LENGTH, MIN_ANSWER_LENGTH, MIN_ASSOCIATED_KEYWORDS, MIN_TECH_NAME_LENGTH, MIN_TOPIC_LENGTH} from 'src/app/constants'
import {DictionaryAnswerForm, DictionaryAnswer} from 'src/types';
import {RightSidePanelService} from '../service/right-side-panel.service';
import * as appSelectors from '../store/app.selectors';
import * as topicPanelActions from './store/topic-panel.actions';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';


@Component({
    selector: 'topic-update-form',
    templateUrl: './topic-update-form.component.html',
    styleUrls: ['./topic-update-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicUpdateFormComponent implements OnInit {
    keywords: string[] = [];
    readonly selectedTech$ = new ReplaySubject<string>(1);
    readonly selectedTopic$ = new ReplaySubject<string>(1);
    private readonly keywords$ = new ReplaySubject<string[]>(1);
    readonly techs$: Observable<string[]> =
        this.store.select(settingsSelectors.selectEnabledNonEmptyTechs);
    readonly allAnswers$: Observable<Map<string, DictionaryAnswer[]>> =
        this.store.select(appSelectors.selectCustomGroupedAnswers);
    
    readonly selectedDictionaryAnswers$: Observable<DictionaryAnswer[]> =
        combineLatest([this.allAnswers$, this.selectedTech$]).pipe(
            debounceTime(0),
            map(([allAnswers, selectedTech]) => allAnswers.get(selectedTech)),
            filter(Boolean),
        ); 
    
    readonly selectedDictionaryAnswer$: Observable<DictionaryAnswer> = 
        combineLatest([this.selectedDictionaryAnswers$, this.selectedTopic$]).pipe(
            debounceTime(0),
            map(([dictionaryAnswers, selectedTopic]) => 
                dictionaryAnswers?.find(({topic}) => topic === selectedTopic)),
            filter(Boolean),
        );

    readonly selectedKeywords$: Observable<string[]> = merge(
        this.selectedDictionaryAnswer$.pipe(map(({dictionary}) => dictionary)),
        this.keywords$,
    );

    private readonly selectedAnswer$: Observable<string> = 
        this.selectedDictionaryAnswer$.pipe(map(({answer}) => answer));

    readonly techField = new FormControl('');
    readonly topicField = new FormControl('', [
        Validators.minLength(MIN_TOPIC_LENGTH),
        Validators.maxLength(MAX_TOPIC_LENGTH),
    ]);
    readonly dictionaryField = new FormControl([], [
        Validators.minLength(MIN_ASSOCIATED_KEYWORDS),
        Validators.maxLength(MAX_ASSOCIATED_KEYWORDS),
    ]);
    readonly answerField = new FormControl('', [
        Validators.minLength(MIN_ANSWER_LENGTH),
        Validators.maxLength(MAX_ANSWER_LENGTH),
    ]);
    
    readonly topicUpdateForm = new FormGroup<DictionaryAnswerForm>({
        techField: this.techField,
        topicField: this.topicField,
        dictionaryField: this.dictionaryField,
        answerField: this.answerField,
    });

    readonly updatedDictionaryAnswer$: Observable<DictionaryAnswer|null> =
        this.topicUpdateForm.valueChanges.pipe(
            debounceTime(INPUT_DEBOUNCE_TIME),
            map(form => {
                const tech = form.techField;
                const topic = form.topicField?.trim();
                const dictionary = form.dictionaryField;
                const answer = form.answerField?.trim();

                return !!tech && !!topic && dictionary?.length && !!answer ?
                    {tech, topic, dictionary, answer} :
                    null;
            }));

    constructor(
        private readonly rightSidePanelService: RightSidePanelService,
        private readonly store: Store,
    ) {}
    
    ngOnInit(): void {
        this.selectedAnswer$.subscribe(answer => {
            this.answerField.setValue(answer);
        });

        this.selectedDictionaryAnswer$.subscribe(({dictionary}) => {
            this.keywords = dictionary;
        });
    }

    removeKeyword(keyword: string): void {
        const index = this.keywords.indexOf(keyword);
        
        if (index !== -1) {
            this.keywords.splice(index, 1);
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        const value = (event.value ?? '').trim();

        if (value) {
            this.keywords = [...this.keywords, value];
            this.keywords$.next(this.keywords);
        }

        event.chipInput!.clear();
    }

    async saveTopic(dictionaryAnswer: DictionaryAnswer): Promise<void> {
        this.rightSidePanelService.close();
        this.resetForm();
        this.store.dispatch(topicPanelActions.addDictionaryAnswer({dictionaryAnswer}));
    }

    private resetForm(): void {
        this.topicUpdateForm.reset();
        this.keywords = [];
    }
}
