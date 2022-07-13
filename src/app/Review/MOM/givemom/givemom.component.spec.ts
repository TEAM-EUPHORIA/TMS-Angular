import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivemomComponent } from './givemom.component';

describe('GivemomComponent', () => {
  let component: GivemomComponent;
  let fixture: ComponentFixture<GivemomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivemomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivemomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
