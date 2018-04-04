/**
 * @description 一个测试的scene interface
 * @author hsky<habxp@163.com>
 */
import { Testenum } from './testenum.enum';
export interface sceneTestInterface {
    id: number;
    group: string;
    uuid: string;
    name: string;
    dialogType: Testenum;
    nextDialog: string;
    errorDialog: string;
}
