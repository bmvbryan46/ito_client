import { TestBed } from '@angular/core/testing';

import { VehiculoGpsService } from './vehiculo-gps.service';

describe('VehiculoGpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculoGpsService = TestBed.get(VehiculoGpsService);
    expect(service).toBeTruthy();
  });
});
