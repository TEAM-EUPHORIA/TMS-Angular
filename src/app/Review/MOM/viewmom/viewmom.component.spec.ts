import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmomComponent } from './viewmom.component';

describe('ViewmomComponent', () => {
  let component: ViewmomComponent;
  let fixture: ComponentFixture<ViewmomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
