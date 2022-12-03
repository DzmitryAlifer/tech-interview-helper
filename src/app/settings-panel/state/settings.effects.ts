import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {SettingsService} from '../../service/settings.service';


@Injectable()
export class SettingsEffects {
    loadMovies$ = createEffect(() => this.actions.pipe(
        ofType('[Settings] Update settings'),
        tap(settings => {
            this.settingsService.saveSettings(settings);
        })
    ), {dispatch: false});

    constructor(
        private actions: Actions,
        private settingsService: SettingsService,
    ) {}
}