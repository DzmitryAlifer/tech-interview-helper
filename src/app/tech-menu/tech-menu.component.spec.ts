import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMenuComponent } from './tech-menu.component';

describe('TechMenuComponent', () => {
  let component: TechMenuComponent;
  let fixture: ComponentFixture<TechMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
