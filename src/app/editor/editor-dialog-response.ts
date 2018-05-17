import { Dialog } from './dialog';
export interface EditorDialogResponse extends IResponse <Array<Dialog>> {
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
    data: Array<Dialog>;
}
