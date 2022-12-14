import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechMenuModule } from './tech-menu/tech-menu.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RecognitionModule } from './recognition/recognition.module';
import { KnowledgeSidebarModule } from './knowledge-sidebar/knowledge-sidebar.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {EffectsModule} from '@ngrx/effects';
import { environment } from '../environments/environment';
import { SettingsPanelModule } from './settings-panel/settings-panel.module';
import {AppEffects} from './store/app.effects';
import {appReducer} from './store/app.reducers';
import {TopicPanelModule} from './topic-panel/topic-panel.module';


const APP_STORE_MODULES = [
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([AppEffects]),
  StoreModule.forRoot({}),
  StoreModule.forFeature('app', appReducer),
];

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
      APP_STORE_MODULES,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      HttpClientModule,
      KnowledgeSidebarModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatSidenavModule,
      RecognitionModule,
      SettingsPanelModule,
      TechMenuModule,
      ToolbarModule,
      TopicPanelModule,
    ],
})
export class AppModule {}
