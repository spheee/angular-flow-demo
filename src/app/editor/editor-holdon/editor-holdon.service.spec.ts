import { TestBed, inject } from '@angular/core/testing';

import { EditorHoldonService } from './editor-holdon.service';

describe('EditorHoldonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorHoldonService]
    });
  });

  it('should be created', inject([EditorHoldonService], (service: EditorHoldonService) => {
    expect(service).toBeTruthy();
  }));
});
