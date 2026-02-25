import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPopup } from './user-popup';

describe('UserPopup', () => {
  let component: UserPopup;
  let fixture: ComponentFixture<UserPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
