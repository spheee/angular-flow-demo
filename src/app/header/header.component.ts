import { Component, OnInit } from '@angular/core';
import { Shape } from '../interface/shape';
import { ShapeComponent } from '../shape/shape.component';
// import { Shape } from '../shape/shape';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  shapes: Shape[];

  constructor() {}

  ngOnInit() {
    this.getShapeList().then(
      data => {
        this.shapes = data;
      });
  }

  getShapeList(): Promise<Shape[]> {
    return Promise.resolve([
      { type: 'a', description: '参数' },
      { type: 'b', description: '判断' },
      { type: 'c', description: '响应' },
      { type: 'd', description: '结束' },
      { type: 'e', description: '参数收集' },
      { type: 'f', description: '退出' },
      { type: 'g', description: '动作' },
      { type: 'h', description: '跳转' }
    ]);
  }
}
