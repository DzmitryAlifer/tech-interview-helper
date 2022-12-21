import {createAction, props} from '@ngrx/store';
import {DictionaryAnswer, Tech} from 'src/types';


export const addDictionaryAnswer = createAction(
    '[Topic Panel] Add dictionary answer',
    props<{dictionaryAnswer: DictionaryAnswer}>(),
);

export const updateTechDictionaryAnswers = createAction(
    '[Topic Panel] Update dictionary answers for the specific tech',
    props<{tech: string|Tech, enabledTopics: Partial<{[x: string]: boolean | null}>}>(),
);