import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';

import { Guid } from '../common/guid';
import { FlowNode } from './flow-node';
import { FlowNodesService } from './flow-nodes.service';
import { FlowSVGFactory } from './flowSvg.factory';
import { SceneDialog } from './scene/scene-dialog';
import { SceneService } from './scene/scene.service';
import { SvgInfoService } from './svg/svg-info.service';

// import { FlowNode } from '../interface/flowNode';
// import { FlowSvgInfoService } from './flow-svg-info.service';
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})

export class FlowComponent implements OnInit {
  /**
   * @description 默认的svg配置
   */
  private defaultSVGOption: any;
  /**
   * @description svg容器
   */
  flowSvg: any;
  /**
   * @description 场景节点的数组
   */
  sceneDialogs: SceneDialog[];

  // flowNode: FlowNode;
  /**
   * @description 节点数组
   */
  flowNodes: Array < FlowNode > ;
  /**
   * @description 渲染器
   */
  private flowRender: any;
  /**
   * @description 图层
   */
  private flowGraph: any;


  /**
   * @description nextDialogType
   */
    nodeTypes = ['+判断', '+动作', '+响应', '+跳转'];

    /**
     * @description 弹出层的状态
     */
    public popStatus: string;


    /**
     * @description 弹出flag
     */
    private popFlag: boolean;

    /**
     * @description 最后一个位置
     */
    private lastPostion: {left: number, top: number};
  /**
   * @description 构造函数
   * @param sceneService 请求
   * @param ele 容器
   * @param svgInfo svg的信息
   */
  constructor(
    private renderer2: Renderer2,
    private sceneService: SceneService,
    private ele: ElementRef,
    private svgInfo: SvgInfoService,
    private _flowNodes: FlowNodesService) {

    this.popFlag = false;
    this.popStatus = 'none';

    this.flowRender = new dagreD3.render();
    this.flowGraph = new dagreD3.graphlib.Graph().setGraph({
        rankdir: 'LR'
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
    this.defineShape();
  }

  ngOnInit() {
    this.initFlowSVG();
    this.flowNodes = this._flowNodes.flowNodes;

    this.renderFlowSVG(this.flowNodes);
    // this.renderFlowSVG();
    // this.buildFlowChart();
    // this.getSceneDialog();
  }

  // 设置shape样式
  defineShape(): void {
    // 自定义意图入口
    this.flowRender.shapes().enteranceRect = (parent, bbox, node) => {
      const shapeSvg = parent.insert('rect', ':first-child')
        .attr('rx', node.rx || 15)
        .attr('ry', node.ry || 15)
        .attr('x', -bbox.width / 2)
        .attr('y', -bbox.height / 2)
        .attr('width', bbox.width)
        .attr('height', bbox.height);
      // 处理联结节点的方法
      node.intersect = function (point) {
        return dagreD3.intersect.rect(node, point);
      };
      return shapeSvg;
    };
    // 自定义参数结束
    this.flowRender.shapes().hexagon = (parent, bbox, node) => {
      const w = bbox.width,
        h = bbox.height;

      const points = [{
            x: 0,
            y: 0
          },
          {
            x: h * .72,
            y: h / 2
          },
          {
            x: h * 1.44,
            y: 0
          },
          {
            x: h * 1.44,
            y: -h
          },
          {
            x: h * .72,
            y: -h * 3 / 2
          },
          {
            x: 0,
            y: -h
          },
        ],

        hexagon = parent.insert('polygon', ':first-child')
        .attr('points', points.map(function (d) {
          return d.x + ',' + d.y;
        }).join(` `))
        .attr('transform', `translate(${-w / 2 } ,${h / 2})`);

      node.intersect = function (point) {
        return dagreD3.intersect.polygon(node, points, point);
      };
      return hexagon;
    };
    // 自定义参数收集
    this.flowRender.shapes().arrow = (parent, bbox, node) => {
      const w = bbox.width,
        h = bbox.height;

      const points = [{
            x: 0,
            y: 0
          },
          {
            x: 2 * h,
            y: 0
          },
          {
            x: 2.5 * h,
            y: -h / 2
          },
          {
            x: 2 * h,
            y: -h
          },
          {
            x: 0,
            y: -h
          },
        ],

        arrow = parent.insert('polygon', ':first-child')
        .attr('points', points.map(function (d) {
          return d.x + ',' + d.y;
        }).join(` `))
        .attr('transform', `translate(${-w / 2 } ,${h / 2})`);

      node.intersect = function (point) {
        return dagreD3.intersect.polygon(node, points, point);
      };
      return arrow;
    };
  }
  /**
   * @description 初始化SVG
   */
  initFlowSVG(): void {
    // TODO:使用groupId为svg赋值
    const svgId = this.svgInfo.svgGroupId;
    this.flowSvg = d3.select('svg');
    if (this.flowSvg.nodes.length <= 0) {
      const container = this.ele.nativeElement.querySelector('.flow-container');
      this.flowSvg = d3.select(container).append('svg').attr('id', svgId)
        .attr('class', 'lowChart')
        .attr('width', '2500')
        .attr('height', '1200');
    }
  }
  /**
   * @description 渲染flowSVG
   * @param {FlowNode} svgNodeArr 节点node数组
   * @param {any} svgElement 可选 svg根元素
   */
  renderFlowSVG(svgNodeArr: Array < FlowNode > , svgElement ? ): void {
    // 先实现
    // flowSvg容器
    const self = this;
    const flowGroup = this.flowSvg.html('').append('g').attr('id', new Guid().newGuid());
    // const render = new dagreD3.render();
    // const graph = new dagreD3.graphlib.Graph().setGraph({});

    const connector = {
      prevDialogUuid: '',
      nextDialogUuid: ''
    };
    let edgeArr = [];
    // const prevDialogUuid = undefined;
    svgNodeArr.forEach((item, index) => {
      self.flowGraph.setNode(item.uuid, {
        shape: item.nodeShapeType,
        label: item.description,
        id: item.uuid,
        class: item.nodeShapeType
      });
      // TODO:这里严重需要优化 属于model设计问题
      if (item.nextDialog !== '' && item.nextDialog !== undefined) {
        edgeArr.push({
          prev: item.uuid,
          next: item.nextDialog
        });
      }

      // d3.select(self.flowGraph.node(item.uuid)).attr('node-uuid',item.uuid);
      // const vt=self.flowGraph.node(item.uuid)

      console.log('渲染节点类型:' + item.nodeShapeType + ' uuid:' + item.uuid);
      console.log('拥有nextDialog:' + item.nextDialog);
    });
    if (edgeArr.length > 0) {
      edgeArr.forEach((item, index) => {
        self.flowGraph.setEdge(item.prev, item.next, {
          // label: 'hjsdhjs'
        });
      });
    }

    this.flowRender(flowGroup, self.flowGraph);
    // render(flowGroup, graph);
    // TODO: rebuild
    d3.selectAll('.lowChart .node').nodes().forEach(item => {
      d3.select(item)
        .on('mouseover', function () {
          // TODO:这里this就是target但是没有getClientRects和getBBox 如何解决
          const target = self.ele.nativeElement.querySelector('#' + d3.select(this).attr('id'));
          const left = target.getClientRects()[0].x + target.getBBox().width - 20;
          const top = target.getClientRects()[0].y + target.getBBox().height / 2;

          self.popFlag = true;
          self.pops(self.popFlag, {left : left, top: top});
        })
        .on('mouseleave', function() {
          self.popFlag = false;
          self.pops(self.popFlag);
        })
        .on('click', function () {
          const currentNodeId = d3.select(this).attr('id');
          self.addNode(2, '点击就送', currentNodeId);
        })
        // .on('dblclick', function () {
        // alert('===>> 双击事件入口 <<===');
        // });
    });
  }

  /**
   * @name FlowComponent#addNode
   * @description 向SVG中添加节点
   * @param {number} type 类型
   * @param {string} description 描述
   * @param {string} currentUuid 添加节点所附着的节点uuid
   */
  addNode(type ?: number, description ?: string, currentUuid ?: string) {
    // uuid = uuid || new Guid().newGuid(),
    type = type || 0;
    description = description || '测试节点';

    // create a new node
    const newNode = new FlowNode(type);
    newNode.description = description;
    // this.flowNodes.push(newNode);
    this._flowNodes.addNode(newNode, currentUuid);
    this.flowNodes = this._flowNodes.flowNodes;
    this.renderFlowSVG(this.flowNodes);
  }


  public popover() {
    this.popFlag = true;
    this.pops(this.popFlag);
  }
  public popleave() {
    this.popFlag = false;
    this.pops(this.popFlag);
  }

  /**
   * @name FlowComponent#pops
   * @description pops事件
   * @param {object} postion 位置坐标
   * @param {boolean} state 开关状态
   * @param {FlowNode} node 当前hover节点
   */
  private pops(state: boolean = false, postion?: { left: number, top: number}, node?: FlowNode) {
    const pops = this.ele.nativeElement.querySelector('.node-hover');
    this.lastPostion = postion || this.lastPostion;
    if (state) {
      this.popStatus = 'inline-block';
      this.renderer2.setStyle(pops, 'left', this.lastPostion .left + 'px');
      this.renderer2.setStyle(pops, 'top', this.lastPostion .top - pops.height  + 'px');
    } else {
      this.popStatus = 'none';
    }
  }

  // 点击事件  带入类型
  public popClick() {

  }







  /**
   * @deprecated
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
   * @deprecated
   * @param flowNode 
   */
  buildFlowChart(flowNode ? : any): void {
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
      g.setNode(v.id.toString(), v);
      // printedArr.push(new Array().concat(v.id, v.nid))
      // if (v.nid && v.nid.length > 0) {
      //     for (let index = 0; index < v.nid.length; index++) {
      //         const element = v.nid[index];
      //         g.setEdge(v.id,element,{label:v.description})
      //         console.log(element)
      //     }
      // }
      if (v.pid >= 0) {
        g.setEdge(v.pid.toString(), v.id.toString(), {
          label: v['description']
        });
      }
    });
    g.setEdge('0', '1');
    const render = new dagreD3.render();
    render(d3.select('svg'), g);
  }
}
