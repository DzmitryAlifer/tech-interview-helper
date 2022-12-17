import {createReducer, on} from '@ngrx/store';
import {enableTech, updateSettings} from './settings.actions';


export interface Settings {
    enabledTechs: string[];
    textHighlightColor: string;
    backgroundHighlightColor: string;
}

export const initialState: Settings = {
    enabledTechs: [],
    textHighlightColor: '',
    backgroundHighlightColor: '',
};

export const settingsReducer = createReducer(
    initialState,
    on(updateSettings, (state, {enabledTechs, textHighlightColor, backgroundHighlightColor}) => ({
        ...state, 
        enabledTechs,
        textHighlightColor,
        backgroundHighlightColor,
    })),
    on(enableTech, (state, {tech}) => ({
        ...state, 
        enabledTechs: [...state.enabledTechs, tech],
    })),
);