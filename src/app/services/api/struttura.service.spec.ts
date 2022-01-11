import { TestBed } from '@angular/core/testing';

import { StrutturaService } from './struttura.service';

describe('StrutturaService', () => {
  let service: StrutturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrutturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
