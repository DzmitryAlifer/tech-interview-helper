import {createReducer, on} from '@ngrx/store';
import {Tech} from 'src/types';
import {updateSettings} from './settings.actions';


export interface Settings {
    enabledTechs: string[];
}

export const initialState: Settings = {
    enabledTechs: [],
};

export const settingsReducer = createReducer(
    initialState,
    on(updateSettings, (state, {enabledTechs}) => ({...state, enabledTechs})),
);