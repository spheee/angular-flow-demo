import { Injectable } from '@angular/core';
import { Numeric } from 'd3';
import { CookieService } from 'ngx-cookie';
import { SceneService } from './scene/scene.service';

import { FlowNode } from './flow-node';
import { Guid } from '../common/guid';

@Injectable()
export class FlowNodesService {
  // 不要使用FlowNode的interface
  private _flowNodes: Array < FlowNode > ;

  private endDate: Date;

  constructor(private cookieService: CookieService,private sceneService:SceneService) {
    this._flowNodes = new Array < FlowNode > ();
    // TODO:这里时间可能有一些问题，先不管
    this.endDate = new Date();
    this.endDate.setTime(this.endDate.getTime() + 24 * 60 * 60 * 1000);
  }

  public get flowNodes(): Array < FlowNode > {
    if (this._flowNodes.length === 0) {
      // getObject返回的不是对象而是数组 TODO:修改any类型，去除空判断
      const staticData: any = this.cookieService.getObject('flow-svg-nodes');
      if (staticData && staticData.length) {
        this._flowNodes = staticData;
      } else {
        const tempNode = new FlowNode(0);
        // 生成一个默认意图入口节点
        // 生成一个UUID
        tempNode.uuid = new Guid().newGuid();
        tempNode.description = '意图入口';
        this._flowNodes.push(tempNode);
        this.cookieService.putObject('flow-svg-nodes', this._flowNodes, {
          expires: this.endDate.toUTCString()
        });

      }
    }
    // 请求
    return this._flowNodes;

  }
  public set flowNodes(v: Array < FlowNode > ) {
    // 保存
    this._flowNodes = v;
    this.cookieService.putObject('flow-svg-nodes', this._flowNodes, {
      expires: this.endDate.toUTCString()
    });
  }
  /**
   * @name FlowNodesService#addNode
   * @description 添加一个节点
   * @param {FlowNode} node 节点对象
   * @param {string} currentUuid 添加节点所附着的节点uuid
   */
  public addNode(node: FlowNode, currentUuid?: string): number {
    const uuid = new Guid().newGuid();
    Object.assign(node, {
      uuid: uuid
    });
    if (currentUuid) {
      this.update(currentUuid, { nextDialog: uuid });
    }

    this._flowNodes.push(node);
    this.cookieService.putObject('flow-svg-nodes', this._flowNodes, {
      expires: this.endDate.toUTCString()
    });
    return this._flowNodes.length;
  }

  /**
   * @name FlowNodesService#remove
   * @description 删除一个节点
   * @param {number} key 删除的id值
   */
  public remove(key: number): number {
    // this._flowNodes.findIndex((v: FlowNode, index: number, arr: Array<FlowNode>):boolean => {
    if (this._flowNodes.length > 0) {
      const nodeIndex = this._flowNodes.findIndex((v: FlowNode): boolean => {
        return key === v.id;
      });
      this._flowNodes.splice(nodeIndex, 1);
      return this._flowNodes.length;
    } else {
      // TODO:这里有bug
      return -1;
    }
  }
  /**
   * @name FlowNodesService#removeAll
   * @description 清空数组
   */
  public removeAll() {
    this._flowNodes = [];
  }

  /**
   * @name FlowNodesService#_update
   * @description 修改一个节点
   * @param {FlowNode} node 节点
   */
  private _update(node: FlowNode): number {
    if (this._flowNodes.length > 0) {
      const nodeIndex = this._flowNodes.findIndex((v: FlowNode): boolean => {
        return node.uuid === v.uuid;
      });
      Object.assign(this._flowNodes[nodeIndex], node);
      return 0;
    } else {
      return -1;
    }
  }
  /**
   * @name FlowNodesService#update
   * @description 修改一个节点
   * @param {string} uuid 唯一标识
   * @param {object} obj 修改的部分内容
   */
  public update(uuid: string, obj: object): number {
    if (this._flowNodes.length > 0) {
      const nodeIndex = this._flowNodes.findIndex((v: FlowNode): boolean => {
        return uuid === v.uuid;
      });
      Object.assign(this._flowNodes[nodeIndex], obj);
      return 0;
    } else {
      return -1;
    }

  }



  private getSceneDialogs() {
    this.sceneService
    .getSceneDialogs()
    .subscribe(sceneDialogs => {
      // this.sceneDialogs = sceneDialogs;
      // console.log(this.sceneDialogs);
    });
  }
}

