import { TestBed } from '@angular/core/testing';

import { SpreadsheetDataService } from './spreadsheet-data.service';

describe('SpreadsheetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpreadsheetDataService = TestBed.get(SpreadsheetDataService);
    expect(service).toBeTruthy();
  });
});
