import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as appActions from '../../store/app.actions';
import * as topicPanelActions from './topic-panel.actions';


@Injectable()
export class TopicPanelEffects {
    addDictionaryAnswers = createEffect(() => this.actions.pipe(
        ofType(topicPanelActions.addDictionaryAnswer),
        map(({dictionaryAnswer}) => appActions.addDictionaryAnswer({dictionaryAnswer})),
        catchError(() => EMPTY),
    ));

    constructor(private actions: Actions) {}
}