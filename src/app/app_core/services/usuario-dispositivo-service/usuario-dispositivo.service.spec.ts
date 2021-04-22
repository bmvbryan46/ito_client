import { TestBed } from '@angular/core/testing';

import { UsuarioDispositivoService } from './usuario-dispositivo.service';

describe('UsuarioDispositivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioDispositivoService = TestBed.get(UsuarioDispositivoService);
    expect(service).toBeTruthy();
  });
});
