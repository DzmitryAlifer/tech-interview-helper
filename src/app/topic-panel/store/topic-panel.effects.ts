import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {saveDictionaryAnswer, saveDictionaryAnswers} from 'src/app/service/firebase';
import * as appActions from '../../store/app.actions';
import * as topicPanelActions from './topic-panel.actions';


@Injectable()
export class TopicPanelEffects {
    addDictionaryAnswers = createEffect(() => this.actions.pipe(
        ofType(topicPanelActions.addDictionaryAnswer),
        tap(async ({dictionaryAnswer}) => {
            await saveDictionaryAnswer(dictionaryAnswer);
        }),
        map(({dictionaryAnswer}) => appActions.addDictionaryAnswer({dictionaryAnswer})),
        catchError(() => EMPTY),
    ));

    updateTechDictionaryAnswers = createEffect(() => this.actions.pipe(
        ofType(topicPanelActions.updateTechDictionaryAnswers),
        tap(async ({tech, enabledTopics, dictionaryAnswers}) => {
            await saveDictionaryAnswers(tech, enabledTopics, dictionaryAnswers);
        }),
        map(() => appActions.loadCustomKnowledgeBase()),
    ));

    constructor(private actions: Actions) {}
}