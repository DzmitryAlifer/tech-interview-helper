import {createReducer, on} from '@ngrx/store';
import * as actions from './settings.actions';


export interface Settings {
    enabledTechs: string[];
    textHighlightColor: string;
    backgroundHighlightColor: string;
    hasVoiceRecognition?: boolean;
    userUid?: string;
}

export const initialState: Settings = {
    enabledTechs: [],
    textHighlightColor: '',
    backgroundHighlightColor: '',
};

export const settingsReducer = createReducer(
    initialState,
    on(actions.updateSettings, (state, settings) => ({
        ...state, 
        enabledTechs: settings.enabledTechs,
        hasVoiceRecognition: settings.hasVoiceRecognition,
        textHighlightColor: settings.textHighlightColor,
        backgroundHighlightColor: settings.backgroundHighlightColor,
    })),
    on(actions.enableTech, (state, {tech}) => ({
        ...state, 
        enabledTechs: [...state.enabledTechs, tech],
    })),
);