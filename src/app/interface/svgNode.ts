export interface SVGNode {
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
}
