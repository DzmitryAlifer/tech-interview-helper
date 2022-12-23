import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Store} from '@ngrx/store';
import {Observable, map, debounceTime} from 'rxjs';
import {ADD_NEW_TECH_SELECTION, INPUT_DEBOUNCE_TIME, MAX_ANSWER_LENGTH, MAX_ASSOCIATED_KEYWORDS, MAX_TECH_NAME_LENGTH, MAX_TOPIC_LENGTH, MIN_ANSWER_LENGTH, MIN_ASSOCIATED_KEYWORDS, MIN_TECH_NAME_LENGTH, MIN_TOPIC_LENGTH} from 'src/app/constants'
import {DictionaryAnswerForm, DictionaryAnswer} from 'src/types';
import {RightSidePanelService} from '../service/right-side-panel.service';
import * as topicPanelActions from './store/topic-panel.actions';
import * as settingsActions from '../settings-panel/state/settings.actions';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';


@Component({
    selector: 'topic-update-form',
    templateUrl: './topic-update-form.component.html',
    styleUrls: ['./topic-update-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicUpdateFormComponent {
    keywords: string[] = [];
    readonly techs$: Observable<string[]> =
        this.store.select(settingsSelectors.selectEnabledNonEmptyTechs);

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

    readonly dictionaryAnswer$: Observable<DictionaryAnswer|null> =
        this.topicUpdateForm.valueChanges.pipe(
            debounceTime(INPUT_DEBOUNCE_TIME),
            map(form => {
                const tech = this.getTechFieldValue(form);
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

    removeKeyword(keyword: string): void {
        const index = this.keywords.indexOf(keyword);
        
        if (index !== -1) {
            this.keywords.splice(index, 1);
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        const value = (event.value ?? '').trim();

        if (value) {
            this.keywords.push(value);
        }

        event.chipInput!.clear();
    }

    async saveTopic(dictionaryAnswer: DictionaryAnswer): Promise<void> {
        this.rightSidePanelService.close();
        this.resetForm();
        this.store.dispatch(topicPanelActions.addDictionaryAnswer({dictionaryAnswer}));
    }

    private getTechFieldValue(form: any): string {
        return !!form.techField && form.techField !== ADD_NEW_TECH_SELECTION ?
            form.techField :
            form.newTechField?.trim();
    }

    private resetForm(): void {
        this.topicUpdateForm.reset();
        this.keywords = [];
    }
}
