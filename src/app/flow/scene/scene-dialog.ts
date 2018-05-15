/**
 * @description 场景对话请求接受
 * @author hsky
 */
import {
  Scene
} from './scene.interface';
// export class SceneDialog implements Scene {
//     /**
//      * @description id
//      */
//     id: number;
//     /**
//      * @description 会话组id
//      */
//     groupId: string;
//     /**
//      * @description 会话组名称
//      */
//     group: string;
//     /**
//      * @description uuid
//      */
//     uuid: string;
//     /**
//      * @description 名称
//      */
//     name: string;
//     /**
//      * @description 会话类型
//      */
//     dialogType: number;
//     /**
//      * @description 下一个节点
//      */
//     nextDialog: string;
//     /**
//      * @description 错误节点
//      */
//     errorDialog: string;
// }
export class SceneDialog implements IResponse < Array < Scene >> {
  /**
   * @description 返回信息
   */
  message: string;
  /**
   * @description 返回状态码
   */
  status: number;
  /**
   * @description 返回信息
   */
  data: Array < Scene >;
}
