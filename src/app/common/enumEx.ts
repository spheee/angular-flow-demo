/**
 * @description ts枚举加强类
 */
export class EnumEx {
    private constructor() {
    }
    /**
     * @description 返回键值对
     * @param e 枚举实例
     */
    static getNamesAndValues<T extends number>(e: any) {
        return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }
    /**
     * @description 返回key值
     * @param e 枚举实例
     */
    static getNames(e: any) {
        return Object.keys(e).filter(k => typeof e[k] === 'number') as string[];
    }
    /**
     * @description 返回value值
     * @param e 枚举实例
     */
    static getValues<T extends number>(e: any) {
        return Object.keys(e)
            .map(k => e[k])
            .filter(v => typeof v === 'number') as T[];
    }

}