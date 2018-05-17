export class Tag {
    /**
     * @description 删除标记 1 -删除
     */
    del?: number;
    /**
     * @description 标签id
     */
    id?: number;
    /**
     * @description 标签名称
     */
    name: string;
    /**
     * @description  轮次
     */
    rounds: number;
    /**
     * @description 关联节点uuid
     */
    sceneUuid: string;
    /**
     * @description 类型 0:准入 1:生成
     */
    type: number;
}
