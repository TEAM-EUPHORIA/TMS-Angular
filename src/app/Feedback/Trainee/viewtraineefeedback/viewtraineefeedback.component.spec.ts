import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtraineefeedbackComponent } from './viewtraineefeedback.component';

describe('ViewtraineefeedbackComponent', () => {
  let component: ViewtraineefeedbackComponent;
  let fixture: ComponentFixture<ViewtraineefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtraineefeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtraineefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
