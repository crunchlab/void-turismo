import { TestBed } from '@angular/core/testing';

import { FeatureToStrutturaService } from './feature-to-struttura.service';

describe('FeatureToStrutturaService', () => {
  let service: FeatureToStrutturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureToStrutturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
