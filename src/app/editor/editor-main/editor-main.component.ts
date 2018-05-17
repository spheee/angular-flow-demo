import {
    AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2,
    ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import 'rxjs/add/operator/debounceTime';


import { Subject } from 'rxjs/Subject';

import { Guid } from '../../common/guid';
import { EditorActionService } from '../editor-action.service';
import { EditorHoldonService } from '../editor-holdon/editor-holdon.service';
import { gblen } from '../../common/gblen';

// import '../../common/intersect';
// import { SceneDialog } from '../../flow/scene/scene-dialog';
@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.css'],
  providers: [EditorHoldonService]
})
export class EditorMainComponent implements OnInit, AfterContentChecked {
  // 定义容器
  @ViewChild('flow') flow: ElementRef;
  @ViewChild('flowContainer') flowContainer: ElementRef;
  @ViewChild('flowPops') flowPops: ElementRef;
  @ViewChild('flowSVG') flowSVG: ElementRef;
  @ViewChild('flowGraph') flowGraph: ElementRef;
  @ViewChild('flowHoldOnPops') flowHoldOnPops: ElementRef;

  /**
   * @description 浮动延迟事件
   */
  holdOn = new Subject<any>();

  /**
   * @description 当前选中状态的会话
   */
  currentDialog: any;
  /**
   * @description 会话组id
   */
  groupId: string;

  flowLabels: any;
  /**
   * @description 连线
   */
  flowLines: any;
  /**
   * @description
   */
  flowNodes: Array < CalDialog > ;


  defaultOptions = {
    /**
     * @description 字体大小
     */
    fontSize: 16,
    /**
     * @description 排列方向
     */
    rankDir: 'TB',
    /**
     * @description 节点 x 轴方向间距
     */
    nodeSep: 100,
    /**
     * @description 节点 y 轴方向间距
     */
    rankSep: 80
  };


  /**
   * @description 保存的画布位置
   */
  graphPosition = {
    x: 0,
    y: 0
  };
  /**
   * @description 鼠标位置
   */
  mousePosition = {
    x: 0,
    y: 0
  };
  /**
   * @description 起始点位置
   */
  defaultPosition = {
    x: 100,
    y: 100
  };

  positionArray: Array < Position > ;

  /**
   * @description 拖拽节点
   */
  draggingNode: any;
  /**
   * @description 起点
   */
  draggingStart: {
    x: number,
    y: number
  };

  /**
   * @description 信息点位置
   */
  infoNode = {
    x: 0,
    y: 0
  };
  /**
   * @description 画布是否拖拽
   */
  isGraphOnDrag = false;

  /**
   * @description 节点弹窗是否弹出
   */
  isNodeOnAction = false;
  /**
   * @description 节点是否启动holdOn事件
   */
  isNodeHoldOnAction = false;

  nodeActions = [{
      type: 0,
      action: [{
        k: '+参数搜集',
        v: 1
      }]
    },
    {
      type: 1,
      action: [{
          k: '+判断',
          v: 2
        }, {
          k: '+动作',
          v: 3
        }, {
          k: '+响应',
          v: 4
        }, {
          k: '+跳转',
          v: -1
        }
      ]
    }, {
      type: 2,
      action: [{
        k: '+动作',
        v: 3
        }, {
        k: '+响应',
        v: 4
        }, {
        k: '+跳转',
        v: -1
        }]
    }, {
      type: 3,
      action: [{
        k: '+参数搜集',
        v: 1
        }, {
        k: '+判断',
        v: 2
        }, {
        k: '+跳转',
        v: -1
      }]
    }, {
      type: 4,
      action: [{
        k: '+参数搜集',
        v: 1
        }, {
        k: '+跳转',
        v: -1
        }, {
        k: '+退出',
        v: -5
      }]
    }
  ];
  nodeAction = [];

  constructor(
    private route: ActivatedRoute,
    private ele: ElementRef,
    private editorActionService: EditorActionService,
    private editorHoldOnService: EditorHoldonService,
    private render: Renderer2) {
    // 响应添加节点事件
    editorActionService.addNode.subscribe(res => {
      this.addNode(res.type, res.position);
    });
    // 延时1秒 delay不能取消事件发送 不可行
    this.holdOn.debounceTime(1000).subscribe( res => {
      if (res && res.node) {
        if (this.isNodeHoldOnAction){
          this.toggleHoldOnNodeActionPops(this.isNodeHoldOnAction, res.node);
        }
      }
    });
  }
  ngOnInit() {
    // 获得当前路由中的groupId
    this.groupId = this.route.snapshot.paramMap.get('group-id');
    this.initFlowSVG();
  }
  ngAfterContentChecked() {
    // 信息点坐标
    this.infoNode = {
      x: this.ele.nativeElement.clientWidth - 150,
      y: 20
    };
  }
  /**
   * @description 初始化flow svg 图形
   */
  initFlowSVG() {
    const svgId = new Guid().uuid(8, 16);
    const dialogs = [{
        id: 1,
        name: '流程图入口sdasdas',
        dialogType: 0,
        nextDialog: '222',
        uuid: '111',
        group: '测试组',
        groupId: 11
      }, {
        id: 2,
        name: 'test',
        dialogType: 1,
        nextDialog: '333',
        uuid: '222',
        group: '测试组',
        groupId: 11
      }, {
        id: 3,
        name: 'test',
        dialogType: 2,
        nextDialog: '',
        uuid: '333',
        group: '测试组',
        groupId: 11
      },
      {
        id: 4,
        name: 'test',
        dialogType: 2,
        nextDialog: '555',
        uuid: '444',
        group: '测试组',
        groupId: 11,
        isVirtual: true,
        virtualIndex: 1,
        prevDialog: '333'
      },
      {
        id: 5,
        name: '逻辑名字',
        dialogType: 2,
        nextDialog: '777',
        uuid: '666',
        group: '测试组',
        groupId: 11,
        isVirtual: true,
        virtualIndex: 2,
        prevDialog: '444'
      },
      {
        id: 6,
        name: 'test',
        dialogType: 3,
        nextDialog: '',
        uuid: '555',
        group: '测试组',
        groupId: 11,
      },
      {
        id: 7,
        name: 'test',
        dialogType: 4,
        nextDialog: '',
        uuid: '777',
        group: '测试组',
        groupId: 11,
      }
    ];

    this.setNodes(dialogs);
    this.link();
  }
  /**
   * @description 添加节点
   * @param {number} type 节点类型
   * @param {Position} position 节点坐标
   */
  addNode(type: number, position: Position) {
    const newUuid = new Guid().uuid(8, 16);
    const newNode: Dialog = {
      name: '点击修改名称',
      dialogType: type,
      nextDialog: '',
      uuid: newUuid,
      group: '测试',
      groupId: 1000,
    };
    this.flowNodes.push(Object.assign(newNode, position, {
      intersection: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }));
    // return ;
  }
  /**
   * @description 连接
   */
  link() {
    const lines = [];
    this.flowNodes.forEach((value, index, arr) => {
      if (index === 0) {
        return;
      }
      // 偏移值 这两个数值可以调整的
      const Xfix = 0,
        Yfix = -5;

      let prevX, prevY, nextX, nextY;

      // 寻找上一个连接节点
      const nextNode = this.findPrev(value);

      // 下 1 4象限
      if (value.y > nextNode.y) {
        // 1 象限
        if (value.x > nextNode.x) {
          if (value.y + value.intersection.top > nextNode.y + nextNode.intersection.bottom) {
            prevX = nextNode.x;
            prevY = nextNode.y + nextNode.intersection.bottom;
            nextX = value.x;
            nextY = value.y + value.intersection.top;
          } else {
            prevX = nextNode.x + nextNode.intersection.right;
            prevY = nextNode.y + Yfix;
            nextX = value.x + value.intersection.left;
            nextY = value.y + Yfix;
          }
        } else {
          if (value.y + value.intersection.top > nextNode.y + nextNode.intersection.bottom) {
            prevX = nextNode.x;
            prevY = nextNode.y + nextNode.intersection.bottom;
            nextX = value.x;
            nextY = value.y + value.intersection.top;
          } else {
            prevX = nextNode.x + nextNode.intersection.left;
            prevY = nextNode.y + Yfix;
            nextX = value.x + value.intersection.right;
            nextY = value.y + Yfix;
          }
        }
      } else {
        // 上 2 3象限
        // 2 象限
        if (value.x > nextNode.x) {
          if (value.y + value.intersection.bottom < nextNode.y + nextNode.intersection.top) {
            prevX = nextNode.x;
            prevY = nextNode.y + nextNode.intersection.top;
            nextX = value.x;
            nextY = value.y + value.intersection.bottom;
          } else {
            prevX = nextNode.x + nextNode.intersection.right;
            prevY = nextNode.y + Yfix;
            nextX = value.x + value.intersection.left;
            nextY = value.y + Yfix;
          }

        } else {
          if (value.y + value.intersection.bottom < nextNode.y + nextNode.intersection.top) {
            prevX = nextNode.x;
            prevY = nextNode.y + nextNode.intersection.top;
            nextX = value.x;
            nextY = value.y + value.intersection.bottom;
          } else {
            prevX = nextNode.x + nextNode.intersection.left;
            prevY = nextNode.y + Yfix;
            nextX = value.x + value.intersection.right;
            nextY = value.y + Yfix;
          }
        }
      }

      lines.push({
        d: `M${prevX},${prevY} L${nextX},${nextY}`
      });
      // lines.push({
      //   d: `M${arr[ index - 1].x + Xfix},${arr[ index - 1].y + Yfix} L${value.x + Xfix},${value.y + Yfix}`
      // });
    });
    this.flowLines = lines;
  }
  /**
   * @description 设置节点
   * @param dialog
   */
  setNodes(dialogs: Array < Dialog > ): void {
    const calArray = [];
    dialogs.forEach((dialog, index) => {
      // 自动 计算节点位置
      let calDialog = new CalDialog();
      calDialog = Object.assign(calDialog, dialog);
      calDialog.x = 0;
      calDialog.y = 0;
      calArray.push(calDialog);
    });
    this.flowNodes = calArray;
    this.calculateNodes(calArray);
  }
  /**
   * @description [链接线用] 查找上一个连接的节点
   * @param calDialog 当前会话节点
   */
  findPrev(calDialog: CalDialog): CalDialog {
    let prevNode: CalDialog;
    if (calDialog.dialogType === 2 && calDialog.isVirtual) {
      // 虚拟节点通过prevDialog查找
      prevNode = this.flowNodes.find((node, index) => node.uuid === calDialog.prevDialog);
    } else {
      prevNode = this.flowNodes.find((node, index) => node.nextDialog === calDialog.uuid);
    }
    return prevNode;
  }
  /**
   * @description [标记点用] 查找当前节点上个节点 如果是逻辑节点 寻找主节点
   * @param calDialog 会话节点
   */
  findNodePrev(calDialog: CalDialog): CalDialog {
    let prevIndex;
    if (calDialog.dialogType === 2 && calDialog.isVirtual) {
      // 虚拟节点通过prevDialog查找
      prevIndex = this.flowNodes.findIndex((node, index) => node.uuid === calDialog.prevDialog);
      if (prevIndex > -1) {
        const prevNode = this.flowNodes[prevIndex];
        if (prevNode.isVirtual) {
          return this.findNodePrev(prevNode);
        } else {
          return prevNode;
        }
      }
    } else {
      prevIndex = this.flowNodes.findIndex((node, index) => node.nextDialog === calDialog.uuid);
      if (prevIndex > -1) {
        const prevNode = this.flowNodes[prevIndex];
        return prevNode;
      }
    }

  }
  /**
   * @description 计算布局
   * @param {Array<CalDialog>} calArray 绘制节点数组
   */
  calculateNodes(calArray: Array < CalDialog > ): void {
    // 初始化坐标
    let xAxisIndex = 0,
      yAxisIndex = 0;
    let xAxis = 0,
      yAxis = 0;
    calArray.forEach((value, index, arr) => {
      this.calculateNode(value);
      let x = this.defaultPosition.x,
        y = this.defaultPosition.y;
      const lastNode = this.findNodePrev(value);
      // 虚拟节点位置
      if (value.dialogType === 2 && value.isVirtual) {
        x = lastNode.x;
        y = lastNode.y + value.virtualIndex * this.defaultOptions.rankSep;
      } else {
        if (lastNode) {
          x = lastNode.x + Math.abs(value.intersection.left) + lastNode.intersection.right + this.defaultOptions.nodeSep;
          y = lastNode.y;
        } else {
          x = this.defaultPosition.x + this.defaultOptions.nodeSep;
          y = this.defaultPosition.y;
        }
      }

      value.x = x;
      value.y = y;
      // console.log(x, y);
    });
    this.flowNodes = calArray;
  }

  /**
   * @description 计算字符串长度
   */
  gblen = function (str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2;
      } else {
        len++;
      }
    }
    return len;
  };

  /**
   * @description 计算节点
   * @param {CalDialog} calDialog 需要绘制的节点
   */
  calculateNode(calDialog: CalDialog): void {
    calDialog.intersection = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    calDialog.label = {
      x: 0,
      y: 0
    };
    calDialog.svg = {
      width: 0,
      points: ''
    };
    let width, height;
    // 通过四个基准点给出坐标
    switch (calDialog.dialogType) {
      case 0:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        calDialog.svg.width = width;
        calDialog.intersection.left = -width / 2;
        calDialog.intersection.right = width / 2;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        break;
      case 1:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        height = 30;
        calDialog.svg.width = width;
        calDialog.intersection.left = -width / 2;
        calDialog.intersection.right = width / 2 + 15;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        calDialog.svg.points =
          `${calDialog.intersection.left},${calDialog.intersection.top} 
        ${calDialog.intersection.right -15},${calDialog.intersection.top} 
        ${calDialog.intersection.right},-5 
        ${calDialog.intersection.right -15},${calDialog.intersection.bottom} 
        ${calDialog.intersection.left},${calDialog.intersection.bottom}`;
        break;
      case 2:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        height = 30;
        // calDialog.svg.width = width;
        calDialog.intersection.left = -width;
        calDialog.intersection.right = width;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        calDialog.svg.points = `${calDialog.intersection.left},-5 0,${calDialog.intersection.top} ${calDialog.intersection.right},-5
        0,${calDialog.intersection.bottom}`;
        break;
      case 3:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        calDialog.svg.width = width;
        calDialog.intersection.left = -width / 2;
        calDialog.intersection.right = width / 2;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        break;
      case 4:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        height = 30;
        calDialog.svg.width = width;
        calDialog.intersection.left = -width / 2 - 15;
        calDialog.intersection.right = width / 2 + 15;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        calDialog.svg.points =
          `${calDialog.intersection.left},-5 
        ${calDialog.intersection.left + 15},${calDialog.intersection.top} 
        ${calDialog.intersection.right -15},${calDialog.intersection.top} 
        ${calDialog.intersection.right},-5 
        ${calDialog.intersection.right -15},${calDialog.intersection.bottom} 
        ${calDialog.intersection.left + 15},${calDialog.intersection.bottom}`;
        break;
      case 5:
        width = gblen(calDialog.name) * 8 + 15 * 2;
        calDialog.svg.width = width;
        calDialog.intersection.left = -width / 2;
        calDialog.intersection.right = width / 2;
        calDialog.intersection.top = -20;
        calDialog.intersection.bottom = 10;
        break;

      default:
        break;
    }
  }

  /**
   * @description 转化坐标为translate
   * @param x x轴
   * @param y y轴
   */
  textTranslate(x, y) {
    return `translate(${x},${y})`;
  }

  modifyName(node, $event): void {

  }
  /**
   * @description 编辑节点内容
   * @param {CalDialog} node 当前绘图节点
   * @param {MouseEvent} $event 鼠标事件
   */
  modifyDetail(node: CalDialog, $event: MouseEvent): void {
  }
  /**
   * @description 重置初始位置
   */
  reset() {
    // graph 归位
    const graphTransform = `translate(0,0)`;
    this.render.setAttribute(this.flowGraph.nativeElement, 'transform', graphTransform);
    this.autoSort();
  }
  /**
   * @description 自动排序布局
   */
  autoSort() {
    this.calculateNodes(this.flowNodes);
    this.link();
  }
  /**
   * @description 节点长悬浮 on 事件
   * @param node 
   * @param  
   */
  onHoldOnNodeAction(node: CalDialog, $event: MouseEvent): void {
    this.isNodeHoldOnAction = true;
    this.holdOn.next({
      node, $event
    });
  }
  /**
   * @description 节点悬浮 off 事件
   * @param {CalDialog} node 当前节点
   * @param {MouseEvent} $event 鼠标事件
   */
  offHoldOnNodeAction(node:CalDialog,$event:MouseEvent):void{

  }
  /**
   * @description 节点 on 事件
   * @param node 
   * @param  
   */
  onNodeAction(node: CalDialog, $event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.render.addClass($event.currentTarget, 'on');

    if (node.dialogType === 2 && !node.isVirtual) {
      return ;
    }
    if (node.nextDialog === '' || node.nextDialog === undefined){
      this.isNodeOnAction = true;
    const position = {
      x: node.x + node.intersection.right - 20,
      y: node.y - 20
    };
    this.toggleNodeActionPops(this.isNodeOnAction, position);
    this.nodeAction = this.nodeActions.find(action => action.type === node.dialogType).action;
    }
  }

  /**
   * @description 节点 off 事件
   * @param node 
   * @param  
   */
  offNodeAction(node, $event: MouseEvent): void {
    this.isNodeOnAction = false;
    this.isNodeHoldOnAction = false;
    this.toggleHoldOnNodeActionPops(false,node);
    this.render.removeClass($event.currentTarget, 'on');
    this.toggleNodeActionPops(this.isNodeOnAction);
  }
  toggleNodeActionPops(flag: boolean, position?: Position) {
    this.render.setStyle(this.flowPops.nativeElement, 'display', flag ? 'inline-block' : 'none');
    if (position) {
      this.render.setStyle(this.flowPops.nativeElement, 'left', `${position.x}px`);
      this.render.setStyle(this.flowPops.nativeElement, 'top', `${position.y}px`);
    }
  }
  toggleHoldOnNodeActionPops(flag: boolean, node?: CalDialog): void {
    this.editorHoldOnService.onHoldOn.emit({
      flag, node
    });

    // this.render.setStyle(this.flowHoldOnPops.nativeElement, 'display', flag ? 'inline-block' : 'none');
  }
  /**
   * @description 节点拖动事件开始
   * @param node 节点信息
   * @param {MouseEvent} $event 鼠标事件
   */
  onDragStart(node, $event: MouseEvent): void {
    this.draggingNode = node;
    this.draggingStart = {
      x: $event.x - node.x,
      y: $event.y - node.y
    };
    this.draggingNode.x = $event.x - this.draggingStart.x;
    this.draggingNode.y = $event.y - this.draggingStart.y;
  }
  /**
   * @description 拖拽画布
   * @param
   */
  @HostListener('mousedown', ['$event.target', '$event'])
  onGraphDrag(ele, $event: MouseEvent): void {
    if (ele.className.baseVal === 'flow-svg') {
      this.isGraphOnDrag = true;
      this.draggingStart = {
        x: $event.x,
        y: $event.y
      };
    } else {
      return;
    }
  }
  @HostListener('mousemove', ['$event.target', '$event'])
  onDrag(ele, $event: MouseEvent): void {
    // 减去偏移值
    this.mousePosition.x = $event.x - this.flowContainer.nativeElement.offsetLeft;
    this.mousePosition.y = $event.y - this.flowContainer.nativeElement.offsetTop;
    // debugger
    // if (!this.draggingNode) {
    //   return;
    // }
    if (this.isGraphOnDrag) {
      // ele.setAttribute('cursor', 'move');
      this.render.setStyle($event.srcElement, 'cursor', 'move');
      const graphX = this.graphPosition.x + $event.x - this.draggingStart.x;
      const graphY = this.graphPosition.y + $event.y - this.draggingStart.y;
      const graphTransform = `translate(${graphX},${graphY})`;
      this.render.setAttribute(this.flowGraph.nativeElement, 'transform', graphTransform);
    } else if (this.draggingNode) {
      // this.render.setStyle($event.srcElement, 'cursor', 'move');
      this.draggingNode.x = $event.x - this.draggingStart.x;
      this.draggingNode.y = $event.y - this.draggingStart.y;
      this.link();
    } else {
      return;
    }
  }
  @HostListener('mouseup', ['$event.target', '$event'])
  onDragEnd(ele, $event: MouseEvent): void {
    this.render.setStyle($event.srcElement, 'cursor', 'default');
    // if (!this.draggingNode) {
    //   return;
    // }
    // ele.setAttribute('cursor', '');
    if (this.isGraphOnDrag) {
      this.graphPosition.x = this.graphPosition.x + $event.x - this.draggingStart.x;
      this.graphPosition.y = this.graphPosition.y + $event.y - this.draggingStart.y;
      this.isGraphOnDrag = false;
    } else {
      this.draggingNode = undefined;
    }
    // this.draggingNode.x = undefined;
    // this.draggingNode.y = undefined;
  }
  @HostListener('document:wheel', ['$event'])
  onWheel($event: WheelEvent): void {
    // debugger
  }

}

interface Position {
  x: number;
  y: number;
}
class Dialog {

  id ?: number;
  name: string;
  dialogType: number;
  nextDialog: string;
  prevDialog ?: string;
  errorDialog ?: string;
  del ?: number;
  uuid: string;
  group: string;
  groupId: number;
  children ?: Array < any > ;
}
/**
 * @description 页面会话节点
 */
class CalDialog extends Dialog implements Position {
  svg ? : {
    width ? : number,
    points ? : string
  };
  label ? : {
    x ? : number,
    y ? : number
  };
  /**
   * @description 简易intersection
   */
  intersection = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  x: number;
  y: number;

  /**
   * @description 是否虚拟节点
   */
  isVirtual ?: boolean;
  /**
   * @description 虚拟节点深度 即children index
   */
  virtualIndex ?: number;
  id ?: number;
  name: string;
  dialogType: number;
  nextDialog: string;
  prevDialog ?: string;
  errorDialog ?: string;
  del ?: number;
  uuid: string;
  group: string;
  groupId: number;
  children ?: Array < any > ;
}
