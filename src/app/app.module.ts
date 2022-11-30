import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechMenuModule } from './tech-menu/tech-menu.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { environment } from '../environments/environment';
import { MeetingModule } from './meeting/meeting.module';
import { SettingsPanelModule } from './settings-panel/settings-panel.module';


@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
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
      MeetingModule,
      RecognitionModule,
      SettingsPanelModule,
      TechMenuModule,
      ToolbarModule,
    ],
})
export class AppModule {}
