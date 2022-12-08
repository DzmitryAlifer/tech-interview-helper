import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDeleteFormComponent } from './topic-delete-form.component';

describe('TopicDeleteForm', () => {
  let component: TopicDeleteFormComponent;
  let fixture: ComponentFixture<TopicDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDeleteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
