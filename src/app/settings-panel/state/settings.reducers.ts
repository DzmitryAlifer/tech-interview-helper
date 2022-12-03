import {createReducer, on} from '@ngrx/store';
import {Tech} from 'src/types';
import {updateSettings} from './settings.actions';

export interface Settings {
    enabledTechs: Tech[];
}

export const initialState: Settings = {
    enabledTechs: Object.values(Tech),
};

export const settingsReducer = createReducer(
    initialState,
    on(updateSettings, (state, {enabledTechs}) => ({...state, enabledTechs})),
);