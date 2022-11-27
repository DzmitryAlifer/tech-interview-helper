import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingTasksComponent } from './coding-tasks.component';

describe('CodingTasksComponent', () => {
  let component: CodingTasksComponent;
  let fixture: ComponentFixture<CodingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
