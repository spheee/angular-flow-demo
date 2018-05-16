import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EditorHoldonService {
  /**
   * @description 接受holdon事件
   */
  onHoldOn: EventEmitter<any>;
  constructor() {
    this.onHoldOn = new EventEmitter();
   }

}
