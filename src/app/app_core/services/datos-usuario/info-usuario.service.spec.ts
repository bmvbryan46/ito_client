import { TestBed } from '@angular/core/testing';

import { InfoUsuarioService } from './info-usuario.service';

describe('InfoUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoUsuarioService = TestBed.get(InfoUsuarioService);
    expect(service).toBeTruthy();
  });
});
