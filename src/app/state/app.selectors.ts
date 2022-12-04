import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './app.reducers';


export const selectAppState = createFeatureSelector<State>('app');

export const selectActivePanel = createSelector(
    selectAppState,
    appState => appState.activePanel,
);
