import { TestBed } from '@angular/core/testing';

import { SelectedTechService } from './selected-tech.service';

describe('SelectedTechService', () => {
  let service: SelectedTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
