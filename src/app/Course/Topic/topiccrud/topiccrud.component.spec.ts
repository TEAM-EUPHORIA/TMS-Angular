import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopiccrudComponent } from './topiccrud.component';

describe('TopiccrudComponent', () => {
  let component: TopiccrudComponent;
  let fixture: ComponentFixture<TopiccrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopiccrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopiccrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
