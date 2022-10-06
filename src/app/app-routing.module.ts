import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechMenuComponent } from './tech-menu/tech-menu.component';

const routes: Routes = [{ path: '**', component: TechMenuComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
