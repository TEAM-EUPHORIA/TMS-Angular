import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivetraineefeedbackComponent } from './givetraineefeedback.component';

describe('GivetraineefeedbackComponent', () => {
  let component: GivetraineefeedbackComponent;
  let fixture: ComponentFixture<GivetraineefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivetraineefeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivetraineefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
