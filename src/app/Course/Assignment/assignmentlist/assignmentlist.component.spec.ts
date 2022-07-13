import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentlistComponent } from './assignmentlist.component';

describe('AssignmentlistComponent', () => {
  let component: AssignmentlistComponent;
  let fixture: ComponentFixture<AssignmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
