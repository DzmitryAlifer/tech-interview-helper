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

        if (!settingsString || settingsString === 'null') {
            return Object.values(Tech);
        } 

        return (JSON.parse(settingsString) as Settings).enabledTechs;
    },
);

export const selectHighlightColors = createSelector(
    selectSettings,
    ({textHighlightColor, backgroundHighlightColor}) => 
        ({textHighlightColor, backgroundHighlightColor}),
);

export const selectHasVoiceRecognition = createSelector(
    selectSettings,
    ({hasVoiceRecognition}) => !!hasVoiceRecognition,
);