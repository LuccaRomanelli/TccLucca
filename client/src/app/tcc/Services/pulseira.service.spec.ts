import { TestBed } from '@angular/core/testing';

import { PulseiraService } from './pulseira.service';

describe('PulseiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PulseiraService = TestBed.get(PulseiraService);
    expect(service).toBeTruthy();
  });
});
