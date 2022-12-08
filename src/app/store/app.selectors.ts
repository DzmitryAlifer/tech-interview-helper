import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.reducers';


const selectAppState = createFeatureSelector<AppState>('app');

export const selectActivePanel = 
    createSelector(selectAppState, ({activePanel}) => activePanel);

export const selectGroupedAnswers = 
    createSelector(selectAppState, ({groupedAnswers}) => groupedAnswers);

export const selectTechs = createSelector(
    selectGroupedAnswers, 
    groupedAnswers => Array.from(groupedAnswers.keys()),
);
