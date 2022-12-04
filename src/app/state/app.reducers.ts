import {createReducer, on} from '@ngrx/store';
import {Panel} from 'src/types';
import {setActivePanel} from './app.actions';


export interface State {
    activePanel: Panel|null;
}

export const initialState: State = {
    activePanel: null,
};

export const appReducer = createReducer(
    initialState,
    on(setActivePanel, (state, {activePanel}) => ({...state, activePanel})),
);