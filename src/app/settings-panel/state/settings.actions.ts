import {createAction, props} from '@ngrx/store';
import {Settings} from './settings.reducers';


export const updateSettings = 
    createAction('[Settings] Update settings', props<Settings>());

export const enableTech = 
    createAction('[Settings] Add enabled tech', props<{tech: string}>());

export const toggleVoiceRecognition =
    createAction('[Settings] Toggle voice recognition');
