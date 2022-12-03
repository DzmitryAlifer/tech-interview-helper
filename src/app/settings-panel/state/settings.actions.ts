import {createAction, props} from '@ngrx/store';
import {Settings} from './settings.reducers';


export const updateSettings = 
    createAction('[Settings] Update settings', props<Settings>());