import { TestBed, inject } from '@angular/core/testing';

import { SvgInfoService } from './svg-info.service';

describe('SvgInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgInfoService]
    });
  });

  it('should be created', inject([SvgInfoService], (service: SvgInfoService) => {
    expect(service).toBeTruthy();
  }));
});
