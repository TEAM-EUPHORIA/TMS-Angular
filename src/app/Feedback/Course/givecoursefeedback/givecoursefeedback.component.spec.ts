import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivecoursefeedbackComponent } from './givecoursefeedback.component';

describe('GivecoursefeedbackComponent', () => {
  let component: GivecoursefeedbackComponent;
  let fixture: ComponentFixture<GivecoursefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivecoursefeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivecoursefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
