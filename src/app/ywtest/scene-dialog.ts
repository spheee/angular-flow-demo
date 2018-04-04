/**
 * @description 场景对话
 * @author hsky <habxp@163.com>
 */
import {Scene} from './scene.interface';
export class SceneDialog implements Scene {
    id: number;
    group: string;
    uuid: string;
    name: string;
    dialogType: number;
    nextDialog: string;
    errorDialog: string;
}
