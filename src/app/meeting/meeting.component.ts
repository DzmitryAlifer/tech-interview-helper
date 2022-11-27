import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {DataService} from '../service/data.service';


@Component({
  selector: 'meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingComponent {
  @Input() url!: SafeResourceUrl;
}
