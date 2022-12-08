import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './app.reducers';


const selectAppState = createFeatureSelector<State>('app');

export const selectActivePanel = 
    createSelector(selectAppState, ({activePanel}) => activePanel);

export const selectGroupedAnswers = 
    createSelector(selectAppState, ({groupedAnswers}) => groupedAnswers);

export const selectTechs = createSelector(
    selectGroupedAnswers, 
    groupedAnswers => Array.from(groupedAnswers.keys()),
);
