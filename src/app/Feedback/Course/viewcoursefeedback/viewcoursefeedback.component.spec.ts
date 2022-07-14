import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoursefeedbackComponent } from './viewcoursefeedback.component';

describe('ViewcoursefeedbackComponent', () => {
  let component: ViewcoursefeedbackComponent;
  let fixture: ComponentFixture<ViewcoursefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcoursefeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcoursefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
