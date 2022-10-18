import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recognition } from './recognition.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [Recognition],
  exports: [Recognition],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class RecognitionModule {}
