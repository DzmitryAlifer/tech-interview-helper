import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TechLabelModule} from '../shared/tech-label/tech-label.module';
import {TopicCreateForm} from './topic-create-form.component';
import {TopicPanelComponent} from './topic-panel.component';
import {TopicPanelEffects} from './store/topic-panel.effects';
import {TopicDeleteFormComponent} from './topic-delete-form.component';


const TOPIC_PANEL_STORE_MODULES = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([TopicPanelEffects]),
];


@NgModule({
    declarations: [TopicCreateForm, TopicDeleteFormComponent, TopicPanelComponent],
    exports: [TopicPanelComponent],
    imports: [
      CommonModule,
      MatButtonModule,
      MatChipsModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatTabsModule,
      ReactiveFormsModule,
      TechLabelModule,
      TOPIC_PANEL_STORE_MODULES,
    ]
})
export class TopicPanelModule {}
