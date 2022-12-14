import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {KnowledgeSidebar} from './knowledge-sidebar.component';
import {TechLabelModule} from '../shared/tech-label/tech-label.module';


@NgModule({
  declarations: [KnowledgeSidebar],
  exports: [KnowledgeSidebar],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    TechLabelModule,
  ]
})
export class KnowledgeSidebarModule {}
