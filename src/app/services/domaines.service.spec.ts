import { TestBed } from '@angular/core/testing';

import { DomainesService } from './domaines.service';

describe('DomainesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainesService = TestBed.get(DomainesService);
    expect(service).toBeTruthy();
  });
});
