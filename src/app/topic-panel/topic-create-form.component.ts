import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatSelectChange} from '@angular/material/select';
import {DictionaryAnswerForm, Tech} from 'src/types';


const ADD_NEW_TECH_SELECTION = 'add new technology...';
const MIN_TECH_NAME_LENGTH = 1;
const MAX_TECH_NAME_LENGTH = 30;
const MIN_TOPIC_LENGTH = 3;
const MAX_TOPIC_LENGTH = 50;
const MIN_ASSOCIATED_KEYWORDS = 1;
const MAX_ASSOCIATED_KEYWORDS = 10;
const MIN_ANSWER_LENGTH = 5;
const MAX_ANSWER_LENGTH = 2000;


@Component({
    selector: 'topic-create-form',
    templateUrl: './topic-create-form.component.html',
    styleUrls: ['./topic-create-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicCreateForm {
    isNewTechSelected = false;
    readonly techs = [ADD_NEW_TECH_SELECTION, ...Object.values(Tech)];
    readonly keywords: string[] = [];

    readonly techField = new FormControl('');
    readonly newTechField = new FormControl('', [
        Validators.minLength(MIN_TECH_NAME_LENGTH), 
        Validators.maxLength(MAX_TECH_NAME_LENGTH),
    ]);
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
    
    readonly topicCreateForm = new FormGroup<DictionaryAnswerForm>({
        tech: this.techField,
        newTechField: this.newTechField,
        topic: this.topicField,
        dictionary: this.dictionaryField,
        answer: this.answerField,
    });

    onTechSelect({value}: MatSelectChange): void {
        this.isNewTechSelected = value === ADD_NEW_TECH_SELECTION;
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
            this.keywords.push(value);
        }

        event.chipInput!.clear();
    }
}
