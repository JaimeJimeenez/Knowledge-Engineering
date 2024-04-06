import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBoardComponent } from './input-board.component';

describe('InputBoardComponent', () => {
  let component: InputBoardComponent;
  let fixture: ComponentFixture<InputBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputBoardComponent]
    });
    fixture = TestBed.createComponent(InputBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
