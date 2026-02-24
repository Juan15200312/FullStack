import { TestBed } from '@angular/core/testing';

import { AlertQuestionService } from './alert-question-service';

describe('AlertQuestionService', () => {
  let service: AlertQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
