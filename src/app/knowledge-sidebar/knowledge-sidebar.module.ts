import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSidebar } from './knowledge-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KnowledgeSidebar],
  exports: [KnowledgeSidebar],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
  ]
})
export class KnowledgeSidebarModule {}
