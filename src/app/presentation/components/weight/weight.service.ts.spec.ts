import { TestBed } from '@angular/core/testing';

import { WeightServiceTs } from './weight.service.ts';

describe('WeightServiceTs', () => {
  let service: WeightServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
