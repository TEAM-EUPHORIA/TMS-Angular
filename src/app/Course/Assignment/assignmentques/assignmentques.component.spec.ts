import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentquesComponent } from './assignmentques.component';

describe('AssignmentquesComponent', () => {
  let component: AssignmentquesComponent;
  let fixture: ComponentFixture<AssignmentquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
