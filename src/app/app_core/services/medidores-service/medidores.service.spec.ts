import { TestBed } from '@angular/core/testing';

import { MedidoresService } from './medidores.service';

describe('MedidoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedidoresService = TestBed.get(MedidoresService);
    expect(service).toBeTruthy();
  });
});
