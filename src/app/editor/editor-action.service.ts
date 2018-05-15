import { Injectable, EventEmitter } from '@angular/core';

class NodeAction{
  type: number;
  position: {
    x: number,
    y: number
  };
}
@Injectable()
export class EditorActionService {

  addNode: EventEmitter<NodeAction>;
  constructor() {
    this.addNode = new EventEmitter();
  }
}
