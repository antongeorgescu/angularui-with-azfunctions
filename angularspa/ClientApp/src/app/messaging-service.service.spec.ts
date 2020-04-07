import { TestBed } from '@angular/core/testing';

import { MessagingServiceService } from './messaging-service.service';

describe('MessagingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagingServiceService = TestBed.get(MessagingServiceService);
    expect(service).toBeTruthy();
  });
});
