import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayouts } from './main-layouts';

describe('MainLayouts', () => {
  let component: MainLayouts;
  let fixture: ComponentFixture<MainLayouts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayouts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayouts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
