import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechLabelComponent } from './tech-label.component';

describe('TechLabelComponent', () => {
  let component: TechLabelComponent;
  let fixture: ComponentFixture<TechLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
