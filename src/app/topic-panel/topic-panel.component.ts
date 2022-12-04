import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DictionaryAnswer} from 'src/types';
import {RightSidePanelService} from '../service/right-side-panel.service';


@Component({
  selector: 'topic-panel',
  templateUrl: './topic-panel.component.html',
  styleUrls: ['./topic-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPanelComponent {
  dictionaryAnswer: DictionaryAnswer|null = null;

  constructor(private readonly rightSidePanelService: RightSidePanelService) {}

  close(): void {
    this.rightSidePanelService.close();
  }

  onFormChange(dictionaryAnswer: DictionaryAnswer|null): void {
    this.dictionaryAnswer = dictionaryAnswer;
  }

  saveTopic(): void {
    console.log(this.dictionaryAnswer);
  }
}
