import { TestBed, inject } from '@angular/core/testing';

import { EditorActionService } from './editor-action.service';

describe('EditorActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorActionService]
    });
  });

  it('should be created', inject([EditorActionService], (service: EditorActionService) => {
    expect(service).toBeTruthy();
  }));
});
