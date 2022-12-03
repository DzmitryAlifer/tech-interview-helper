import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Tech} from 'src/types';
import {Settings} from './settings.reducers';


export const selectSettings = createFeatureSelector<Settings>('settings');

export const selectEnabledTechs = createSelector(
    selectSettings,
    settingsState => {
        if (settingsState.enabledTechs.length) {
            return settingsState.enabledTechs;
        } 
        
        const settingsString = localStorage.getItem('settings');

        if (!settingsString) {
            return Object.values(Tech);
        } 

        return (JSON.parse(settingsString) as Settings).enabledTechs;
    },
);
