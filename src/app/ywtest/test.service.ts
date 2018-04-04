import { Injectable } from '@angular/core';
/**
 * @description 一个关于testService的crud操作
 * @author hsky<habxp@163.com>
 */
@Injectable()
export class TestService {

  greet(name: string) {
     return 'Hello ' + name + '!';
    }
  constructor() {
    console.log('this is testService constructor...');
  }
}
