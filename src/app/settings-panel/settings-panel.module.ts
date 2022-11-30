import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SettingsPanelComponent} from './settings-panel.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
  ],
  declarations: [SettingsPanelComponent],
  exports: [SettingsPanelComponent],
})
export class SettingsPanelModule {}
