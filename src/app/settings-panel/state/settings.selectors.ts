import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Settings} from './settings.reducers';
import * as appSelectors from 'src/app/store/app.selectors';
import {DEFAULT_FONT_SIZE_PX} from 'src/app/constants';


export const selectSettings = createFeatureSelector<Settings>('settings');

const selectSavedSettings = createSelector(
    selectSettings,
    settingsState => {
        const settingsString = localStorage.getItem('settings');

        return !settingsString || settingsString === 'null' ? 
            settingsState :
            JSON.parse(settingsString) as Settings;
    },
);

export const selectEnabledTechs = createSelector(
    selectSavedSettings,
    ({enabledTechs}) => enabledTechs,
);

export const selectEnabledNonEmptyTechs = createSelector(
    selectEnabledTechs,
    appSelectors.selectGroupedAnswers,
    (enabledTechs, groupedAnswers) => 
        enabledTechs.filter(tech => !!groupedAnswers.get(tech)?.length),
);

export const selectHighlightColors = createSelector(
    selectSavedSettings,
    ({textHighlightColor, backgroundHighlightColor}) => 
        ({textHighlightColor, backgroundHighlightColor}),
);

export const selectHasVoiceRecognition = createSelector(
    selectSavedSettings,
    ({hasVoiceRecognition}) => !!hasVoiceRecognition,
);

export const selectFontSize = createSelector(
    selectSettings,
    selectSavedSettings,
    (settings, updatedSettings) => 
        settings.fontSize ?? updatedSettings.fontSize ?? DEFAULT_FONT_SIZE_PX,
);