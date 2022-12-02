import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SettingsPanelComponent} from './settings-panel.component';


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
  ],
  declarations: [SettingsPanelComponent],
  exports: [SettingsPanelComponent],
})
export class SettingsPanelModule {}
