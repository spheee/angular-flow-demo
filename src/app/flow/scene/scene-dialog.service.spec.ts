import { TestBed, inject } from '@angular/core/testing';

import { SceneDialogService } from './scene-dialog.service';

describe('SceneDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SceneDialogService]
    });
  });

  it('should be created', inject([SceneDialogService], (service: SceneDialogService) => {
    expect(service).toBeTruthy();
  }));
});
