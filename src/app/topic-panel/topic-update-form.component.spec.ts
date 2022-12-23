import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicUpdateFormComponent } from './topic-update-form.component';

describe('TopicUpdateFormComponent', () => {
  let component: TopicUpdateFormComponent;
  let fixture: ComponentFixture<TopicUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
