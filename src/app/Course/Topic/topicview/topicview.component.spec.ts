import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicviewComponent } from './topicview.component';

describe('TopicviewComponent', () => {
  let component: TopicviewComponent;
  let fixture: ComponentFixture<TopicviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
