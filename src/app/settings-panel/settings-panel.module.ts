import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TechLabelModule} from '../shared/tech-label/tech-label.module';
import {SettingsPanelComponent} from './settings-panel.component';
import {SettingsEffects} from './state/settings.effects';
import {settingsReducer} from './state/settings.reducers';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TechLabelModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  declarations: [SettingsPanelComponent],
  exports: [SettingsPanelComponent],
})
export class SettingsPanelModule {}
