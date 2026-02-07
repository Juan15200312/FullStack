import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popups } from './popups';

describe('Popups', () => {
  let component: Popups;
  let fixture: ComponentFixture<Popups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
