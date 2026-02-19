import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePayment } from './message-payment';

describe('MessagePayment', () => {
  let component: MessagePayment;
  let fixture: ComponentFixture<MessagePayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagePayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
