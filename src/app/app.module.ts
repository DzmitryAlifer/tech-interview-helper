import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechMenuModule } from './tech-menu/tech-menu.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RecognitionModule } from './recognition/recognition.module';
import { KnowledgeSidebarModule } from './knowledge-sidebar/knowledge-sidebar.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    KnowledgeSidebarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RecognitionModule,
    TechMenuModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
