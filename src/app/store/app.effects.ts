import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import * as appActions from './app.actions';
import {AnswerProviderService} from '../service/answer-provider.service';


@Injectable()
export class AppEffects {
    loadKnowledgeBase = createEffect(() => this.actions.pipe(
        ofType(appActions.loadKnowledgeBase),
        concatMap(() => [
            appActions.loadGoldDataKnowledgeBase(),
            appActions.loadCustomKnowledgeBase(),
        ]),
        catchError(() => EMPTY),
    ));

    loadGoldDataKnowledgeBase = createEffect(() => this.actions.pipe(
        ofType(appActions.loadGoldDataKnowledgeBase),
        switchMap(() => this.answerProviderService.getAllGoldDataAnswers()),
        map(dictionaryAnswers => appActions.loadGoldDataKnowledgeBaseSuccess({dictionaryAnswers})),
        catchError(() => EMPTY),
    ));

    loadCustomKnowledgeBase = createEffect(() => this.actions.pipe(
        ofType(appActions.loadCustomKnowledgeBase),
        switchMap(() => this.answerProviderService.getAllCustomAnswers()),
        map(dictionaryAnswers => appActions.loadCustomKnowledgeBaseSuccess({dictionaryAnswers})),
        catchError(() => EMPTY),
    ));

    constructor(
        private actions: Actions,
        private answerProviderService: AnswerProviderService,
    ) {}
}