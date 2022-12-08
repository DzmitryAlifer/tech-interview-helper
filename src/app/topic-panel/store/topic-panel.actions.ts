import {createAction, props} from '@ngrx/store';
import {DictionaryAnswer} from 'src/types';


export const addDictionaryAnswer = createAction(
    '[Topic Panel] Add dictionary answer',
    props<{dictionaryAnswer: DictionaryAnswer}>(),
);