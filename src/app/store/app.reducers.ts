import {createReducer, on} from '@ngrx/store';
import {DictionaryAnswer, Panel} from 'src/types';
import * as appActions from './app.actions';


export interface AppState {
    activePanel: Panel|null;
    groupedAnswers: Map<string, DictionaryAnswer[]>;
}

export const initialState: AppState = {
    activePanel: null,
    groupedAnswers: new Map(),
};

export const appReducer = createReducer(
    initialState,
    on(appActions.setActivePanel, (state, {activePanel}) => 
        ({...state, activePanel})),
    on(appActions.loadKnowledgeBaseSuccess, (state, {dictionaryAnswers}) => 
        ({...state, groupedAnswers: groupAnswersByTech(dictionaryAnswers)})),
    on(appActions.addDictionaryAnswer, (state, {dictionaryAnswer}) => {
        const groupedAnswers = new Map(state.groupedAnswers);
        let dictionaryAnswers = groupedAnswers.get(dictionaryAnswer.tech);
        dictionaryAnswers = dictionaryAnswers ? 
            [...dictionaryAnswers, dictionaryAnswer] : 
            [dictionaryAnswer];
        groupedAnswers.set(dictionaryAnswer.tech, dictionaryAnswers);
        return {...state, groupedAnswers};
    }),
);

function groupAnswersByTech(dictionaryAnswers: DictionaryAnswer[]) {
    return dictionaryAnswers.reduce((map, dictionaryAnswer) => {
        const techDictionaryAnswers = map.get(dictionaryAnswer.tech) ?? [];
        techDictionaryAnswers.push(dictionaryAnswer);
        map.set(dictionaryAnswer.tech, techDictionaryAnswers);
        return map;
    }, new Map<string, DictionaryAnswer[]>());
}
