/**
 * @description 场景对话类型枚举
 * @author hsky
 */
export enum DialogType {
    /**
     * @description 意图场景 DIALOG_TYPE_INTENT
     */
    意图场景 = 0,
    /**
     * @description 参数收集 DIALOG_TYPE_COLLECT
     */
    参数收集 = 1,
    /**
     * @description 逻辑判断 DIALOG_TYPE_JUDGE
     */
    逻辑判断 = 2,
    /**
     * @description 动作 DIALOG_TYPE_ACTION
     */
    动作 = 3,
    /**
     * @description 响应 DIALOG_TYPE_RESPOND
     */
    响应 = 4,
    /**
     * @description 结束 DIALOG_TYPE_END
     */
    结束 = 5
}
