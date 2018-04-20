/**
 * @description 场景对话
 * @author hsky
 */
import {Scene} from './scene.interface';
export class SceneDialog implements Scene {
    /**
     * @description id
     */
    id: number;
    /**
     * @description 会话组
     */
    group: string;
    /**
     * @description uuid
     */
    uuid: string;
    /**
     * @description 名称
     */
    name: string;
    /**
     * @description 会话类型
     */
    dialogType: number;
    /**
     * @description 下一个节点
     */
    nextDialog: string;
    /**
     * @description 错误节点
     */
    errorDialog: string;
}
