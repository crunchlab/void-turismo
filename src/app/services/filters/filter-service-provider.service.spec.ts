import { TestBed } from '@angular/core/testing';

import { FilterServiceProviderService } from './filter-service-provider.service';

describe('FilterServiceProviderService', () => {
  let service: FilterServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
