import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputObstaclesComponent } from './input-obstacles.component';

describe('InputObstaclesComponent', () => {
  let component: InputObstaclesComponent;
  let fixture: ComponentFixture<InputObstaclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputObstaclesComponent]
    });
    fixture = TestBed.createComponent(InputObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
