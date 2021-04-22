import { TestBed } from '@angular/core/testing';

import { ElementoService } from './elemento.service';

describe('ElementoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementoService = TestBed.get(ElementoService);
    expect(service).toBeTruthy();
  });
});
