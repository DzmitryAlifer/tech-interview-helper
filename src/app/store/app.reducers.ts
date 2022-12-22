import {createReducer, on} from '@ngrx/store';
import {DictionaryAnswer, Panel} from 'src/types';
import * as appActions from './app.actions';


export interface AppState {
    activePanel: Panel|null;
    groupedAnswers: Map<string, DictionaryAnswer[]>;
    goldDataAnswers: DictionaryAnswer[];
    goldDataGroupedAnswers: Map<string, DictionaryAnswer[]>;
    customAnswers: DictionaryAnswer[];
    customGroupedAnswers: Map<string, DictionaryAnswer[]>;
}

export const initialState: AppState = {
    activePanel: null,
    groupedAnswers: new Map(),
    goldDataAnswers: [],
    goldDataGroupedAnswers: new Map(),
    customAnswers: [],
    customGroupedAnswers: new Map(),
};

export const appReducer = createReducer(
    initialState,
    on(appActions.setActivePanel, (state, {activePanel}) => 
        ({...state, activePanel})),
    on(appActions.loadGoldDataKnowledgeBaseSuccess, (state, {dictionaryAnswers}) => {
        const goldDataGroupedAnswers = groupAnswersByTech(dictionaryAnswers);
        return {
            ...state,
            goldDataAnswers: dictionaryAnswers,
            goldDataGroupedAnswers,
            groupedAnswers: goldDataGroupedAnswers,
        };
    }),
    on(appActions.loadCustomKnowledgeBaseSuccess, (state, {dictionaryAnswers}) => ({
        ...state,
        customAnswers: dictionaryAnswers,
        customGroupedAnswers: groupAnswersByTech(dictionaryAnswers),
        groupedAnswers: groupAnswersByTech([state.goldDataAnswers, dictionaryAnswers].flat()),
    })),
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
