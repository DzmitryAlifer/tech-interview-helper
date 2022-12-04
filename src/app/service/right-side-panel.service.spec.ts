import { TestBed } from '@angular/core/testing';

import { RightSidePanelService } from './right-side-panel.service';

describe('RightSidePanelService', () => {
  let service: RightSidePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSidePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
