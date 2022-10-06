import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JavaPage } from './java-page/java-page.component';
import { JavascriptPage } from './javascript-page/javascript-page.component';

const routes: Routes = [
  {path: 'java', component: JavaPage},
  {path: 'js', component: JavascriptPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
