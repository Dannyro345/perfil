import { TestBed } from '@angular/core/testing';

import { PerfilServiceService } from './perfil-service.service';

describe('PerfilServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilServiceService = TestBed.get(PerfilServiceService);
    expect(service).toBeTruthy();
  });
});
