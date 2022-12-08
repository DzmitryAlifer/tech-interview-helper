import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RightSidePanelService} from '../service/right-side-panel.service';


@Component({
  selector: 'topic-panel',
  templateUrl: './topic-panel.component.html',
  styleUrls: ['./topic-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPanelComponent {
  constructor(private readonly rightSidePanelService: RightSidePanelService) {}

  close(): void {
    this.rightSidePanelService.close();
  }
}
