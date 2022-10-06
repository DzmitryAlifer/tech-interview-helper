import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechMenuModule } from './tech-menu/tech-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    TechMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
