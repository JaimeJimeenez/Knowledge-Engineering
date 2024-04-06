import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPositionComponent } from './input-position.component';

describe('InputPositionComponent', () => {
  let component: InputPositionComponent;
  let fixture: ComponentFixture<InputPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputPositionComponent]
    });
    fixture = TestBed.createComponent(InputPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
