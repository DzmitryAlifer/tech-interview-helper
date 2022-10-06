import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptPageComponent } from './javascript-page.component';

describe('JavascriptPageComponent', () => {
  let component: JavascriptPageComponent;
  let fixture: ComponentFixture<JavascriptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavascriptPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
