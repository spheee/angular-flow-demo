import { Scene } from './scene';
import { SVGNode } from './svgNode';


// interface 可以继承 interface
// interface Ass extends Scene{
//     cox: string;
// }
export interface FlowNode extends Scene, SVGNode {
}


// export class FlowNode implements Scene, SVGNode {
//     /**
//      * @description 节点的ID
//      */
//     id: number;
//     group: string;
//     uuid: string;
//     name: string;
//     dialogType: number;
//     nextDialog: string;
//     errorDialog: string;
//     /**
//      * @description 节点描述文本
//      */
//     description: string;
//     /**
//      * @description 节点样式类型
//      */
//     nodeShapeType: string;

//     /**
//      * @description 绑定事件
//      */
//     event: Function;
// }
