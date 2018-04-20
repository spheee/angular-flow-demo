/**
 * @description  场景interface
 * @author hsky
 */
import { SceneDialogType } from './scene-dialog-type.enum';
export interface Scene {
    /**
     * @description 场景的id
     */
    id: number;
    /**
     * @description 场景组
     */
    group: string;
    /**
     * @description 场景唯一id，用于关联使用
     */
    uuid: string;
    /**
     * @description 场景名称
     */
    name: string;
    /**
     * @description 场景对话类型
     */
    dialogType: SceneDialogType;
    /**
     * @description 下一个场景对话uuid
     */
    nextDialog: string;
    /**
     * @description 错误时跳转的下一个场景uuid
     */
    errorDialog: string;
}
