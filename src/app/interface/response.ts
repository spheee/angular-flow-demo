interface IResponse < T > {
  /**
   * @description 返回信息
   */
  message: string;
  /**
   * @description 返回数据
   */
  data: T;
  /**
   * @description 返回状态码
   */
  status: number;
}
