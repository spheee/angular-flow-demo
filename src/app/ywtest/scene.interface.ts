/**
 * @description 一个测试的scene interface
 * @author hsky<habxp@163.com>
 */
import { DialogType } from './dialog-type.enum';
export interface Scene {
    id: number;
    group: string;
    uuid: string;
    name: string;
    dialogType: DialogType;
    nextDialog: string;
    errorDialog: string;
}
