import {createReducer, on} from '@ngrx/store';
import {enableTech, updateSettings} from './settings.actions';


export interface Settings {
    enabledTechs: string[];
}

export const initialState: Settings = {
    enabledTechs: [],
};

export const settingsReducer = createReducer(
    initialState,
    on(updateSettings, (state, {enabledTechs}) => ({...state, enabledTechs})),
    on(enableTech, (state, {tech}) => ({
        ...state, 
        enabledTechs: [...state.enabledTechs, tech],
    })),
);