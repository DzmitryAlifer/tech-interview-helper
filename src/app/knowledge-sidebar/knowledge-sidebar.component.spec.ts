import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSidebarComponent } from './knowledge-sidebar.component';

describe('KnowledgeSidebarComponent', () => {
  let component: KnowledgeSidebarComponent;
  let fixture: ComponentFixture<KnowledgeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
