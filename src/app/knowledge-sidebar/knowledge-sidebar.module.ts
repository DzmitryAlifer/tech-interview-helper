import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSidebar } from './knowledge-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [KnowledgeSidebar],
  exports: [KnowledgeSidebar],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonToggleModule,
  ]
})
export class KnowledgeSidebarModule {}
