import {createAction, props} from '@ngrx/store';
import {Panel} from 'src/types';


export const setActivePanel =
    createAction('[App] Set active panel', props<{activePanel: Panel|null}>());