import { TestBed } from '@angular/core/testing';

import { PlataformService } from './plataform.service';

describe('PlataformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlataformService = TestBed.get(PlataformService);
    expect(service).toBeTruthy();
  });
});
