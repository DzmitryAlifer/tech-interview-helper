import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPanelComponent } from './topic-panel.component';

describe('TopicPanelComponent', () => {
  let component: TopicPanelComponent;
  let fixture: ComponentFixture<TopicPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
