import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSidebar } from './knowledge-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon'; 
import { ReactiveFormsModule } from '@angular/forms';


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
  ]
})
export class KnowledgeSidebarModule {}
