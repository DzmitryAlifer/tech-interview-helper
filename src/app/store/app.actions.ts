import {createAction, props} from '@ngrx/store';
import {DictionaryAnswer, Panel} from 'src/types';


export const setActivePanel =
    createAction('[App] Set active panel', props<{activePanel: Panel|null}>());

export const loadKnowledgeBase = createAction('[App] Load knowledge base');

export const loadKnowledgeBaseSuccess = createAction(
    '[App] Load knowledge base - success',
    props <{dictionaryAnswers: DictionaryAnswer[]}>(),
);

export const loadGoldDataKnowledgeBase = createAction('[App] Load gold data knowledge base');

export const loadGoldDataKnowledgeBaseSuccess = createAction(
    '[App] Load gold data knowledge base - success',
    props<{dictionaryAnswers: DictionaryAnswer[]}>(),
);

export const loadCustomKnowledgeBase = createAction('[App] Load custom knowledge base');

export const loadCustomKnowledgeBaseSuccess = createAction(
    '[App] Load custom knowledge base - success',
    props <{dictionaryAnswers: DictionaryAnswer[]}>(),
);

export const addDictionaryAnswer = createAction(
    '[App] Add dictionary answer',
    props<{dictionaryAnswer: DictionaryAnswer}>(),
);