import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDangerousComponent } from './input-dangerous.component';

describe('InputDangerousComponent', () => {
  let component: InputDangerousComponent;
  let fixture: ComponentFixture<InputDangerousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputDangerousComponent]
    });
    fixture = TestBed.createComponent(InputDangerousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
