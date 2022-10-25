import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { Tech } from 'src/types';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { AnswerProviderService } from '../service/answer-provider.service';


@Component({
  selector: 'knowledge-sidebar',
  templateUrl: './knowledge-sidebar.component.html',
  styleUrls: ['./knowledge-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgeSidebar implements OnChanges, AfterViewInit {
  readonly techs = Object.values(Tech);
  form = new FormGroup({ 'codeUrl': new FormControl(null) });
  readonly allAnswers$ = this.answerProviderService.getAllAnswers();

  readonly safeCodeUrl$: Observable<SafeResourceUrl> =
    this.form.get('codeUrl')!.valueChanges.pipe(
      map(codeUrl => this.domSanitizer.bypassSecurityTrustResourceUrl(codeUrl)),
    );

  constructor(
    private readonly answerProviderService: AnswerProviderService,
    private readonly domSanitizer: DomSanitizer, 
    private readonly elementRef: ElementRef,
  ) {}

  ngOnChanges() {
    console.log(document.getElementById('#code'));
  }

  ngAfterViewInit() {
    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        console.log(mutation.type);
      });
    }).observe(this.elementRef.nativeElement, { attributes: true, childList: true, characterData: true });

    this.safeCodeUrl$.pipe(
      filter(Boolean),
      delay(3000),
      tap(() => {
        const iframeElement = document.querySelector<HTMLIFrameElement>("#code");
        console.log(iframeElement?.contentWindow?.document.body.innerText);
      }),
    ).subscribe();
  }
}
