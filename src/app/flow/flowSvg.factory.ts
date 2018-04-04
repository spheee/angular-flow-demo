import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';

import {
  Scene
} from '../ywtest/scene.interface';

interface FlowSVGOptions {
  width: number;
  height: number;
  id: string;
}

export class FlowSVGFactory {
  /**
   * @description 返回的svg模型
   */
  svg: any;
  /**
   * @description 默认配置
   */
  defaultOptions: FlowSVGOptions;
  /**
   * @description 构造函数
   * @param options 配置项
   * @param container 容器
   * @param node 节点
   */
  constructor(
    options: {
      width: 100,
      height: 100,
      id: 'test'
    }, container, node) {
  }
  /**
   *
   */
  buildNode() {}
  /**
   * @description 节点点击
   */
  click(): void {}
}
