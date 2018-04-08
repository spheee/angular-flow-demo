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

}
