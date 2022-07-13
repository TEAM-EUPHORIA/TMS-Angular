import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetraineeComponent } from './coursetrainee.component';

describe('CoursetraineeComponent', () => {
  let component: CoursetraineeComponent;
  let fixture: ComponentFixture<CoursetraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursetraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursetraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
