import { TestBed } from '@angular/core/testing';

import { FavLinksService } from './fav-links.service';

describe('FavLinksService', () => {
  let service: FavLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
