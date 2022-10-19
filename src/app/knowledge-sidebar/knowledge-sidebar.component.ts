import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tech } from 'src/types';
import { AnswerProviderService } from '../service/answer-provider.service';


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar {
  readonly techs = Object.values(Tech);
  readonly allAnswers$ = this.answerProviderService.getAllAnswers();

  constructor(private readonly answerProviderService: AnswerProviderService) {}
}
