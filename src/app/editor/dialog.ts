
import { Tag } from './tag';
export class Dialog {
    /**
     * @description id
     */
    id?: number;
    /**
     * @description 名称
     */
    name: string;
    /**
     * @description 会话类型
     */
    dialogType: number;
    /**
     * @description 当前会话uuid
     */
    uuid: string;
    /**
     * @description 下一个会话uuid
     */
    nextDialog: string;
    /**
     * @description 上一个会话uuid
     */
    prevDialog?: string;
    /**
     * @description 错误出口uuid
     */
    errorDialog?: string;
    /**
     * @description del删除标记
     */
    del?: number;
    /**
     * @description 会话组名称
     */
    group: string;
    /**
     * @description 会话组id
     */
    groupId: number;
    /**
     * @description 附加信息
     */
    children?: Array < any > ;
    /**
     * @description 标签数组
     */
    labels?: Array < Tag >;
}
