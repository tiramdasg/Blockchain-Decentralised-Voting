import { TestBed } from '@angular/core/testing';

import { DbnodeService } from './dbnode.service';

describe('DbnodeService', () => {
  let service: DbnodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbnodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
