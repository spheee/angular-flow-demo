import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';

import {FlowNode} from './flow-node';
// import { FlowNode } from '../interface/flowNode';
import { SceneService } from '../scene.service';
import { SceneDialog } from '../ywtest/scene-dialog';
import { FlowSVGFactory } from './flowSvg.factory';

import { Guid } from '../common/guid';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})

export class FlowComponent implements OnInit {
  /**
   * @description svg容器
   */
  flowSvg: any;
  /**
   * @description 场景节点的数组
   */
  sceneDialogs: SceneDialog[];

  flowNode: FlowNode;
  /**
   * @description 节点数组
   */
  flowNodes: Array < FlowNode > ;
  constructor(private sceneService: SceneService, private ele: ElementRef) {}

  ngOnInit() {
    this.initFlowSVG();
    // this.buildFlowChart();
    // this.getSceneDialog();
  }
  /**
   * @description 初始化一个flowSvg，会生成一个默认图形
   * TODO:分拆逻辑
   */
  initFlowSVG(): void {
    // flowSvg容器
    this.flowSvg = d3.select(this.ele.nativeElement).append('svg').attr('id', 'test');
    // 一个默认node 用来初始化
    const defaultNode = new FlowNode(0);
    defaultNode.description = '描述描述';
    this.setFlowNode(this.flowSvg, defaultNode);
    this.addNode()
    // new FlowSVGFactory(,this.flowSvg)
  }
  /**
   * @description 设置一个flow的node
   */
  setFlowNode(
    svgContainer: any, node: FlowNode): void {
    // TODO: 优化？
    // node = Object.assign(node, {
    //   nodeShapeType: nodeShapeType
    // });
    // this.renderFlowNode(svgContainer, node);
  }


  /**
   * @description 新增节点
   * @param uuid 传入的uuid，可选
   * @param type 传入的类型，可选
   */
  addNode( uuid?: string, type?: number) {
    uuid = uuid || new Guid().newGuid(),
    type = type || 0;

    const newNode = new FlowNode(type);
    newNode.uuid = uuid;
    debugger

  }

  addFlowNode(node) {

  }
  /**
   * @description 渲染一个流程图中的node
   * @param ele element
   * @param node 节点 TODO:需要支撑
   */
  renderFlowNode(ele: any, node): void {
    const flowGroup = ele.append('g').attr('id', 'testofitu');
    const flowSVG = this;

    const render = new dagreD3.render();
    const graph = new dagreD3.graphlib.Graph().setGraph({});

    // 设置一个flowNode
    graph.setNode(node.description, { shape: node.nodeShapeType });

    render(flowGroup, graph);
    // TODO: rebuild
    flowGroup.on('click', function () {
      const newNode = {
        type: 1,
        description: '特使',
        nodeShapeType: 'arrow'
      };
      flowSVG.renderFlowNode(ele, newNode);
    });
  }

  /**
   * @description 获得scene数组数据
   */
  getSceneDialog(): void {
    this.sceneService
      .getSceneDialogs()
      .subscribe(sceneDialogs => {
        this.sceneDialogs = sceneDialogs;
        console.log(this.sceneDialogs);
      });
  }

  /**
   * #abandon
   * @param flowNode 
   */
  buildFlowChart(flowNode?: any): void {
    const svg: any = d3.select('.flow').append('svg')
      .attr('class', 'lowChart')
      .attr('width', '2500')
      .attr('height', '1200');

    const g = new dagreD3.graphlib.Graph()
      .setGraph({
        rankdir: 'LR'
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
    const states = [{
        label: '变更机票',
        id: 0,
        pid: -1
      }, {
        label: '参数搜索',
        id: 1,
        pid: 0,

      }, {
        id: 2,
        pid: 1,
        label: '响应：查询客票信息',
        shape: 'rect',
        class: "predefinition third"
      }, {
        id: 3,
        pid: 2,
        label: "逻辑判断",
        shape: "diamond"
      }, {
        id: 4,
        pid: 3,
        label: "响应：告知旅客",
        description: "航班正常",
        class: "predefinition"
      }, {
        id: 5,
        pid: 3,
        description: "航班取消/延误",
        label: "响应：确认起飞时间",
        class: "predefinition"
      }, {
        id: 6,
        pid: 4,
        // description: "航班取消/延误",
        label: "结束"
      },
      {
        id: 7,
        pid: 5,
        label: "参数搜索",
        class: "predefinition"
      },
      {
        id: 8,
        pid: 7,
        label: "逻辑判断",
        shape: "diamond"
      }, {
        id: 9,
        pid: 8,
        label: "响应：发送新的航班信息",
        shape: "rect",
        description: "同意",
        class: "predefinition"
      }, {
        id: 10,
        pid: 8,
        label: "响应：查询新的航班信息",
        shape: "rect",
        description: "不同意",
        class: "predefinition third"
      }, {
        id: 6,
        pid: 9,
        // description: "航班取消/延误",
        label: "结束"
      }, {
        id: 11,
        pid: 10,
        label: "逻辑判断",
        shape: "diamond"
      },
      {
        id: 12,
        pid: 11,
        description: "无航班或无票",
        label: "响应：告知旅客"
      },
      {
        id: 13,
        pid: 11,
        description: "无经济舱票",
        label: "响应：告知旅客"

      }, {
        id: 14,
        pid: 11,
        label: "经济舱有票可控位",
        // label: "响应：跳至确认起飞时间"
      }, {
        id: 6,
        pid: 12,
        // description: "航班取消/延误",
        label: "结束"
      }
    ];
    const printedArr: number[] = [];
    states.forEach(function (v) {
      v['rx'] = v['ry'] = 5;
      g.setNode(v.id, v);
      // printedArr.push(new Array().concat(v.id, v.nid))
      // if (v.nid && v.nid.length > 0) {
      //     for (let index = 0; index < v.nid.length; index++) {
      //         const element = v.nid[index];
      //         g.setEdge(v.id,element,{label:v.description})
      //         console.log(element)
      //     }
      // }
      if (v.pid >= 0) {
        g.setEdge(v.pid, v.id, {
          label: v['description']
        });
      }
    });
    g.setEdge(0, 1);
    const render = new dagreD3.render();
    render(d3.select('svg'), g);
  }
}
