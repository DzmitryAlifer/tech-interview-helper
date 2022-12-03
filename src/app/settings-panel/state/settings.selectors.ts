import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Tech} from 'src/types';
import {Settings} from './settings.reducers';


export const selectSettings = createFeatureSelector<Settings>('settings');

export const selectEnabledTechs = createSelector(
    selectSettings,
    ({enabledTechs}) => enabledTechs,
);
