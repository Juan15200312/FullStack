import { TestBed } from '@angular/core/testing';

import { AuthLocal } from './auth-local';

describe('AuthLocal', () => {
  let service: AuthLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
