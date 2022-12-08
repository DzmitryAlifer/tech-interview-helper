import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as appActions from './app.actions';
import {AnswerProviderService} from '../service/answer-provider.service';


@Injectable()
export class AppEffects {
    loadKnowledgeBase = createEffect(() => this.actions.pipe(
        ofType(appActions.loadKnowledgeBase),
        switchMap(() => this.answerProviderService.getAllAnswers2()),
        map(dictionaryAnswers => appActions.loadKnowledgeBaseSuccess({dictionaryAnswers})),
        catchError(() => EMPTY),
    ));

    constructor(
        private actions: Actions,
        private answerProviderService: AnswerProviderService,
    ) {}
}