import { TestBed } from '@angular/core/testing';

import { DividendDataService } from './dividend-data.service';

describe('DividendDataService', () => {
  let service: DividendDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividendDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
