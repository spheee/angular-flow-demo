import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { dagre } from 'dagre-d3';
import * as figlet from 'figlet';

import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestService } from './ywtest/test.service';

import { TestChildComponent } from './test-component/test-child.component';
import { HeaderComponent } from './header/header.component';
import { ShapeComponent } from './shape/shape.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouteModule } from './route.module';

// import { FlowSvgInfoService } from './flow/flow-svg-info.service';

import { CookieModule } from 'ngx-cookie';

import { DialogComponent } from './dialog/dialog.component';
import { EditorModule } from './editor';

// import { EditorComponent } from './editor/editor.component';

// import { DataCountPipe } from './data-count.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    TestChildComponent,
    HeaderComponent,
    ShapeComponent,
    DialogComponent,
    // EditorComponent,
    // 如果不想要child组件直接出现 或许封装一层？.withServerTransition({ appId: 'serverApp' })
  ],
  imports: [
    EditorModule,
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    RouteModule,
    CookieModule.forRoot(), // forRoot提供了provider
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' }),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {
    //     dataEncapsulation: false
    //   }
    // )
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(testa: TestService) {

    // 这是一个关于泛型的实例 参考 https://www.tslang.cn/docs/handbook/generics.html
    function identity < T > (arg: T): T {
      return arg;
    }


    // // 第一种是我们手动确定了T为string类型
    // let output = identity<string>('this is my first string');

    // console.log(output);
    // // 这里我们是通过泛型的类型推断出的
    // console.log(identity('this is my String'));


    // function loggingIdentity<T>(arg: T[]): T[] {
    //   console.log(arg.length);  // Array has a .length, so no more error
    //   return arg;
    // }
    // console.log(loggingIdentity(['this is my second string']));

    // function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    //   console.log(arg.length);  // Array has a .length, so no more error
    //   return arg;
    // }

    // console.log(loggingIdentity(['this is my third string']));

    // let myIdentity: <T>(arg: T) => T = identity; // myIdentity是一个泛型函数

    // let myIdentity2: <X>(arg: X) => X = identity; // 泛型参数名称可以随便用好吧

    // let myIdentity3: {<T>(arg: T): T} = identity; // 调用签名的对象字面量来定义泛型函数：

    // 对象字面量拿出来做为一个接口 这种方法不被推荐
    // interface GenericIdentityFn {
    //   <B>(arg: B): B;
    // }
    // function identityA<B>(arg: B): B {
    //   return arg;
    // }
    // let myBIdentity: GenericIdentityFn = identityA;


    // interface GenericIdentityFnA<T> {
    //   (arg: T): T;
    // }
    // let myIdentity: GenericIdentityFnA<number> = identity;

    // 泛型类

    class GenericNumber < T > {
      zeroValue: T;
      add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber < number > ();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
      return x + y;
    };


    // console.log(myGenericNumber.add(myGenericNumber.zeroValue, 2));

    // 泛型约束
    interface Lengthwise {
      length: number;
    }

    // 这个方法与之前两个坑爹的方法截然不同请仔细研究
    function loggingIdentity < T extends Lengthwise > (arg: T): T {
      // console.log(arg.length); // Now we know it has a .length property, so no more error
      return arg;
    }
    loggingIdentity('sdjshdj');
    // loggingIdentity(4); // 结果是undefind 但是tsLint会提示你的
    loggingIdentity({
      length: 10,
      value: 3
    }); // 意思就是你要构造一个符合你泛型的实体
    // result
    function create < T > (c: {
      new(): T;
    }): T {
      return new c();
    }
    class BeeKeeper {
      hasMask: boolean;
    }

    class ZooKeeper {
      nametag: string;
    }

    class Animal {
      numLegs: number;
    }

    class Bee extends Animal {
      keeper: BeeKeeper;
    }

    class Lion extends Animal {
      keeper: ZooKeeper;
    }

    function createInstance < A extends Animal > (c: new() => A): A {
      return new c();
    }

    // createInstance(Lion).keeper.nametag;
    // createInstance(Bee).keeper.hasMask;

    // console.log(testa.greet('hola yuwen')); // 这里的testa是一个TestService的实例由 providers提供，不需要new，相当于全局固定的
    console.log(`
     _   _ _   _ _ ____      _____ _ __  
    | | | | | | | '_ \\ \\ /\\ / / _ \\ '_ \\ 
    | |_| | |_| | | | \\ V  V /  __/ | | |
     \\__, |\\__,_|_| |_|\\_/\\_/ \\___|_| |_|
     |___/                                
    `);
  }
}
