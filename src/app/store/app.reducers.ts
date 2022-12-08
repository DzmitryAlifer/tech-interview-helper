import {createReducer, on} from '@ngrx/store';
import {DictionaryAnswer, Panel} from 'src/types';
import {loadKnowledgeBaseSuccess, setActivePanel} from './app.actions';


export interface State {
    activePanel: Panel|null;
    groupedAnswers: Map<string, DictionaryAnswer[]>;
}

export const initialState: State = {
    activePanel: null,
    groupedAnswers: new Map(),
};

export const appReducer = createReducer(
    initialState,
    on(setActivePanel, (state, {activePanel}) => ({...state, activePanel})),
    on(loadKnowledgeBaseSuccess, (state, {dictionaryAnswers}) => 
        ({...state, groupedAnswers: groupAnswersByTech(dictionaryAnswers)})),
);

function groupAnswersByTech(dictionaryAnswers: DictionaryAnswer[]) {
    return dictionaryAnswers.reduce((map, dictionaryAnswer) => {
        const techDictionaryAnswers = map.get(dictionaryAnswer.tech) ?? [];
        techDictionaryAnswers.push(dictionaryAnswer);
        map.set(dictionaryAnswer.tech, techDictionaryAnswers);
        return map;
    }, new Map<string, DictionaryAnswer[]>());
}
