import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {RightSidePanelService} from '../../service/right-side-panel.service';
import {SettingsService} from '../../service/settings.service';
import {selectEnabledNonEmptyTechs} from './settings.selectors';


@Injectable()
export class SettingsEffects {
    private readonly enabledTechs$: Observable<string[]> = 
        this.store.select(selectEnabledNonEmptyTechs);

    updateSettings = createEffect(() => this.actions.pipe(
        ofType('[Settings] Update settings'),
        tap(settings => {
            this.rightSidePanelService.close();
            this.settingsService.saveSettings(settings);
        })
    ), {dispatch: false});

    enableTech = createEffect(() => this.actions.pipe(
        ofType('[Settings] Add enabled tech'),
        withLatestFrom(this.enabledTechs$),
        map(([{tech}, previousEnabledTechs]) => {
            const enabledTechs = [...previousEnabledTechs, tech];
            this.settingsService.saveSettings({enabledTechs});
        })
    ), {dispatch: false});

    constructor(
        private actions: Actions,
        private rightSidePanelService: RightSidePanelService,
        private settingsService: SettingsService,
        private store: Store,
    ) {}
}