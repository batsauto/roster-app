import { TestBed, inject } from '@angular/core/testing';

import { TeameService } from './team.service';

describe('TeameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeameService]
    });
  });

  it('should be created', inject([TeameService], (service: TeameService) => {
    expect(service).toBeTruthy();
  }));
});
