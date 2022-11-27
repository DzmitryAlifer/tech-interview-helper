import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingComponent} from './meeting.component';


@NgModule({
  imports: [CommonModule],
  declarations: [MeetingComponent],
  exports: [MeetingComponent],
})
export class MeetingModule {}
