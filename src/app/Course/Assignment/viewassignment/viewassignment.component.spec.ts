import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassignmentComponent } from './viewassignment.component';

describe('ViewassignmentComponent', () => {
  let component: ViewassignmentComponent;
  let fixture: ComponentFixture<ViewassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewassignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
