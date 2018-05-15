import {
    AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2,
    ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import 'rxjs/add/operator/debounceTime';

import { Guid } from '../../common/guid';
// import '../../common/intersect';
// import { SceneDialog } from '../../flow/scene/scene-dialog';
import { EditorActionService } from '../editor-action.service';

@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.css']
})
export class EditorMainComponent implements OnInit, AfterContentChecked {
  // 定义容器
  @ViewChild('flow') flow: ElementRef;
  @ViewChild('flowContainer') flowContainer: ElementRef;
  @ViewChild('flowPops') flowPops: ElementRef;
  @ViewChild('flowSVG') flowSVG: ElementRef;
  @ViewChild('flowGraph') flowGraph: ElementRef;
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
  flowNodes: Array<CalDialog>;


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

  constructor(
    private route: ActivatedRoute,
    private ele: ElementRef,
    private editorActionService: EditorActionService,
    private render: Renderer2) {
    // 响应添加节点事件
    editorActionService.addNode.subscribe(res => {
      this.addNode(res.type, res.position);
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
    // this.flowContainer = this.ele.nativeElement.querySelector('.flow-container');
    // this.flowSvg = d3.select(this.flowContainer as any).append('svg').attr('id', svgId)

    // d3.select(this.flowSVG.nativeElement)
    // .attr('width', '100%')
    // .attr('height', '100%');

    // const zoom = d3.zoom().on('zoom', () => {
    //   d3.select(this.flowGraph.nativeElement).attr('transform', d3.event.transform);
    // });
    // d3.select(this.flowSVG.nativeElement).call(zoom);



    // this.flowLines = this.flowSvg.append('g').attr('class', 'lines');
    // this.flowLabels = this.flowSvg.append('g').attr('class', 'labels');
    // this.flowNodes = this.flowSvg.append('g').attr('class', 'nodes');
    const ttrs: Dialog = {
      id: 1,
      name: 'test',
      dialogType: 0,
      nextDialog: 'abcdefa',
      uuid: 'abcdefg',
      group: '测试组',
      groupId: 11
    };
    const ttrv: Dialog = {
      id: 2,
      name: 'sdasd',
      dialogType: 2,
      nextDialog: 'abcdefb',
      uuid: 'abcdefa',
      group: '测试组',
      groupId: 11
    };
    const ttrf: Dialog = {
      id: 3,
      name: 'asdsdsx',
      dialogType: 3,
      nextDialog: 'abcdefc',
      uuid: 'abcdefb',
      group: '测试组',
      groupId: 11
    };
    const dialogs = [
      {
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
      }, {
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
      }, {
        id: 5,
        name: 'test',
        dialogType: 2,
        nextDialog: '777',
        uuid: '666',
        group: '测试组',
        groupId: 11,
        isVirtual: true,
        virtualIndex: 2,
        prevDialog: '444'
      }, {
        id: 6,
        name: 'test',
        dialogType: 3,
        nextDialog: '',
        uuid: '555',
        group: '测试组',
        groupId: 11,
      }, {
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
    this.tryLinks();
    // this.tryLinks();
    // this.flowNodes = [ttrs,ttrs];

    // d3.selectAll('.node').call(d3.drag()).on('started', function() {
    // const circle = d3.select(this).classed('dragging', true);

    // d3.event.on('drag', dragged).on('end', ended);
    // function dragged(d) {
    //   circle.raise().attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
    // }
    // function ended() {
    //   circle.classed('dragging', false);
    // }
    // });
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
    this.flowNodes.push(Object.assign(newNode, position));
    // return ;
  }
  // tryAdd(){
  //   this.addNode(2,{x:120,y:150})
  // }
  tryLinks() {
    const lines = [];
    this.flowNodes.forEach((value, index, arr) => {
      if (index === 0) {
        return;
      }
      // 这两个数值可以调整的
      const Xfix = 0,
        Yfix = 0;
      // console.log(`M${arr[ index - 1].x},${arr[ index - 1].y} L${value.x},${value.y}`);
      lines.push({
        d: `M${arr[ index - 1].x + Xfix},${arr[ index - 1].y + Yfix} L${value.x + Xfix},${value.y + Yfix}`
      });
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
      // intersectRect
      // 自动 计算节点位置
      let calDialog = new CalDialog();
      calDialog = Object.assign(calDialog, dialog);
      // const calDialog = Object.assign(dialog, { x: 0, y: 0 });
      calDialog.x = 0;
      calDialog.y = 0;
      calArray.push(calDialog);
    });
    this.flowNodes = calArray;
    this.calculateNodes(calArray);
  }

  /**
   * @description 递归查找当前母体
   * @param prevId 当前虚拟节点的prev Uuid
   */
  findPrev(prevId: string): number {
    const prevIndex = this.flowNodes.findIndex((node, index) => node.uuid === prevId);
    if (prevIndex !== -1 ) {
      if (this.flowNodes[prevIndex].isVirtual) {
        return this.findPrev(this.flowNodes[prevIndex].prevDialog);
      } else {
        return prevIndex;
      }
    }
  }
  /**
   * @description 计算布局
   * @param {Array<CalDialog>} calArray 绘制节点数组
   */
  calculateNodes(calArray: Array < CalDialog > ): void {
    // 初始化坐标
    let xAxisIndex = 0, yAxisIndex = 0;
    let xAxis = 0, yAxis = 0;
    calArray.forEach((value, index , arr) => {
      this.calculateNode(value);
      let x = this.defaultPosition.x,
      y = this.defaultPosition.y;
      if (value.dialogType === 2 && value.isVirtual) {
        // let yTempIndex = this.findPrev(value.prevDialog);
        // console.log(yTempIndex);
        // 虚拟节点 另外一个方向延伸
        // arr.findIndex()
        // yAxisIndex++;
        // x = x + this.defaultOptions.nodeSep * xAxisIndex;
        // y = y + value.virtualIndex * this.defaultOptions.rankSep;
      } else {
        xAxisIndex++;
        x = x + this.defaultOptions.nodeSep * xAxisIndex;
        y = y + this.defaultOptions.rankSep * yAxisIndex;
        // 正常的节点 x+1
      }
      value.x = x;
      value.y = y;
      // console.log(x, y);
    });
    this.flowNodes = calArray;
  }


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
      points: []
    };
    switch (calDialog.dialogType) {
      case 0:
        const width = this.gblen(calDialog.name) * 8 + 15 * 2;
        calDialog.svg.width = width;
        calDialog.intersection.left = - width / 2;
        calDialog.intersection.right =  width / 2;
        calDialog.intersection.top = - 20;
        calDialog.intersection.bottom = 10;
        break;
    
      default:
        break;
    }
  }

  textTranslate(x, y) {
    return `translate(${x},${y})`;
  }

  modifyName(node, $event): void {

  }
  modifyDetail(node, $event): void {}
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
    this.tryLinks();
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
      this.tryLinks();
    } else {
      return;
    }
  }
  @HostListener('mouseup', ['$event.target','$event'])
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

  id ? : number;
  name: string;
  dialogType: number;
  nextDialog: string;
  prevDialog ? : string;
  errorDialog ? : string;
  del ? : number;
  uuid: string;
  group: string;
  groupId: number;
  children ? : Array < any > ;
}
/**
 * @description 页面会话节点
 */
class CalDialog extends Dialog implements Position {

  // labelOption: {
  //   width: number,
  //   height: number
  // };
  // svgOptions:
  svg?: {
    width?: number,
    points?: Array<number>
  };
  label?: {
    x?: number,
    y?: number
  };
  /**
   * @description 简易intersection
   */
  intersection = {
    left : 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  x: number;
  y: number;

  /**
   * @description 是否虚拟节点
   */
  isVirtual?: boolean;
  /**
   * @description 虚拟节点深度 即children index
   */
  virtualIndex?: number;
  id ? : number;
  name: string;
  dialogType: number;
  nextDialog: string;
  prevDialog ? : string;
  errorDialog ? : string;
  del ? : number;
  uuid: string;
  group: string;
  groupId: number;
  children ? : Array < any > ;
}
