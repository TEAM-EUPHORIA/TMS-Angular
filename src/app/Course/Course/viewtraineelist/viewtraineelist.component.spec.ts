import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtraineelistComponent } from './viewtraineelist.component';

describe('ViewtraineelistComponent', () => {
  let component: ViewtraineelistComponent;
  let fixture: ComponentFixture<ViewtraineelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtraineelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtraineelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
