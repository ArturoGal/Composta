import { TestBed } from '@angular/core/testing';

import { GdriveService } from './gdrive.service';

describe('GdriveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GdriveService = TestBed.get(GdriveService);
    expect(service).toBeTruthy();
  });
});
