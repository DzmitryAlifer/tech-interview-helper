import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {RightSidePanelService} from '../../service/right-side-panel.service';
import {SettingsService} from '../../service/settings.service';
import {selectEnabledNonEmptyTechs, selectSettings} from './settings.selectors';
import * as settingsActions from './settings.actions';
import {Settings} from './settings.reducers';


@Injectable()
export class SettingsEffects {
    private readonly settings$: Observable<Settings> =
        this.store.select(selectSettings);
    private readonly enabledTechs$: Observable<string[]> = 
        this.store.select(selectEnabledNonEmptyTechs);

    updateSettings = createEffect(() => this.actions.pipe(
        ofType(settingsActions.updateSettings),
        tap(() => {
            this.rightSidePanelService.close();
        }),
        switchMap(settings => this.settingsService.saveSettings(settings)),
        map(settings => settingsActions.updateSettingsSuccess(settings!)),
    ));

    enableTech = createEffect(() => this.actions.pipe(
        ofType(settingsActions.enableTech),
        withLatestFrom(this.settings$, this.enabledTechs$),
        map(([{tech}, peviousSettings, previousEnabledTechs]) => {
            const enabledTechs = [...previousEnabledTechs, tech];
            this.settingsService.saveSettings({...peviousSettings, enabledTechs});
        })
    ), {dispatch: false});

    constructor(
        private actions: Actions,
        private rightSidePanelService: RightSidePanelService,
        private settingsService: SettingsService,
        private store: Store,
    ) {}
}