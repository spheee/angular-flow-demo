import { TestBed, inject } from '@angular/core/testing';

import { FlowNodesService } from './flow-nodes.service';

describe('FlowNodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowNodesService]
    });
  });

  it('should be created', inject([FlowNodesService], (service: FlowNodesService) => {
    expect(service).toBeTruthy();
  }));
});
