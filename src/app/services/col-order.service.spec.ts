import { TestBed } from '@angular/core/testing';

import { ColOrderService } from './col-order.service';

describe('ColOrderService', () => {
  let service: ColOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
