import {createReducer, on} from '@ngrx/store';
import {DEFAULT_FONT_SIZE_PX} from 'src/app/constants';
import * as actions from './settings.actions';


export interface Settings {
    enabledTechs: string[];
    textHighlightColor: string;
    backgroundHighlightColor: string;
    fontSize?: number;
    hasVoiceRecognition?: boolean;
    userUid?: string;
}

export const initialState: Settings = {
    enabledTechs: [],
    textHighlightColor: '',
    backgroundHighlightColor: '',
    fontSize: DEFAULT_FONT_SIZE_PX,
};

export const settingsReducer = createReducer(
    initialState,
    on(actions.updateSettingsSuccess, (state, settings) => ({
        ...state, 
        enabledTechs: settings.enabledTechs,
        hasVoiceRecognition: settings.hasVoiceRecognition,
        textHighlightColor: settings.textHighlightColor,
        backgroundHighlightColor: settings.backgroundHighlightColor,
        fontSize: settings.fontSize,
    })),
    on(actions.enableTech, (state, {tech}) => ({
        ...state, 
        enabledTechs: [...state.enabledTechs, tech],
    })),
);