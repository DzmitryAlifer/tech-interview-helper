import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tech } from 'src/types';


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar {
  readonly techs = Object.values(Tech);

  constructor() {}
}
