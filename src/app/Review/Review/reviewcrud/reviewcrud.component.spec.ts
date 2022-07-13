import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewcrudComponent } from './reviewcrud.component';

describe('ReviewcrudComponent', () => {
  let component: ReviewcrudComponent;
  let fixture: ComponentFixture<ReviewcrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewcrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
