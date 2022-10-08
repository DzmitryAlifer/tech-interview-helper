import { TestBed } from '@angular/core/testing';

import { AnswerProviderService } from './answer-provider.service';

describe('AnswerProviderService', () => {
  let service: AnswerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
