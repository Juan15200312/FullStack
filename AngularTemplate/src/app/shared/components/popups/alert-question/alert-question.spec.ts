import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertQuestion } from './alert-question';

describe('AlertQuestion', () => {
  let component: AlertQuestion;
  let fixture: ComponentFixture<AlertQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
