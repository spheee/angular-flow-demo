import { Scene } from '../interface/scene';
import { SVGNode } from '../interface/svgNode';

/**
 * @description 流程图节点的类型
 * @author hsky
 */
/**
 * @description 混合实现了Scene和SVGNode两个interface
 */
export class FlowNode implements Scene, SVGNode {
  group: string;
  /**
   * @description uuid
   */
  uuid: string;
  /**
   * @description 场景名称
   */
  name: string;
  /**
   * @description 场景对话类型
   */
  dialogType: number;
  /**
   * @description 下一个场景对话uuid
   */
  nextDialog: string;
  /**
   * @description 错误时跳转的下一个场景uuid
   */
  errorDialog: string;
  /**
   * @description id
   */
  id: number;
  /**
   * @description 节点描述文本
   */
  description: string;
  /**
   * @description 节点样式类型
   */
  nodeShapeType: string;
  /**
   * @description 绑定事件
   */
  event: Function;
  /**
   * @description 可编辑性
   */
  editable: boolean;

  /**
   * @description 初始化时必须指定场景的类型 TODO:初始化参数需要多几个字段
   * @param dType 场景类型
   */
  constructor(dType?: number) {
    /**
     * 直接指定节点样式类型
     */
    // this.nodeShapeType='rect';
    switch (dType) {
      // 意图场景
      case 0:
        this.nodeShapeType = 'enteranceRect'; // TODO:意图场景的shape需要重新规划一下
        break;
        // 实体参数收集
      case 1:
        this.nodeShapeType = 'arrow';
        break;
        // 逻辑判断场景
      case 2:
        this.nodeShapeType = 'diamond';
        break;
        // 动作
      case 3:
        this.nodeShapeType = 'fathexagon';
        break;
        // 响应场景
      case 4:
        this.nodeShapeType = 'longrect';
        break;
        // 结束场景
      case 5:
        this.nodeShapeType = 'hexagon';
        break;
      default:
        this.nodeShapeType = 'rect';
        break;
    }
  }

  // setShapeType():void{

  // }
}
