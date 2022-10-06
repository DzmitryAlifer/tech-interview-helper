import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaPageComponent } from './java-page.component';

describe('JavaPageComponent', () => {
  let component: JavaPageComponent;
  let fixture: ComponentFixture<JavaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
