import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadassignmentComponent } from './uploadassignment.component';

describe('UploadassignmentComponent', () => {
  let component: UploadassignmentComponent;
  let fixture: ComponentFixture<UploadassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadassignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
