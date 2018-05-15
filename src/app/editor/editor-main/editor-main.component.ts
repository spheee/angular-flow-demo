import {
    AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2,
    ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import 'rxjs/add/operator/debounceTime';

import { Guid } from '../../common/guid';
import '../../common/intersect';
import { SceneDialog } from '../../flow/scene/scene-dialog';
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
        name: 'test',
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
      const Xfix = 30,
        Yfix = 20;
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
    calArray.forEach((value, index , arr) => {
      let x = this.defaultPosition.x,
      y = this.defaultPosition.y;
      if (value.dialogType === 2 && value.isVirtual) {
        // let yTempIndex = this.findPrev(value.prevDialog);
        // console.log(yTempIndex);
        // 虚拟节点 另外一个方向延伸
        // arr.findIndex()
        // x = x + this.defaultOptions.nodeSep * xAxisIndex;
        // y = y + value.virtualIndex * this.defaultOptions.rankSep;
      } else {
        x = x + this.defaultOptions.nodeSep * xAxisIndex;
        y = y;
        // 正常的节点 x+1
        xAxisIndex++;
      }
      value.x = x;
      value.y = y;
      console.log(x, y);
    });
    this.flowNodes = calArray;
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



    // 拖拽节点则矛盾
    // if (this.draggingNode) {
    //   return;
    // } else {
    // debugger


    // }
    // 逻辑写反了
    // const graphTransform = `translate(-${$event.x},-${$event.y})`;
    // this.render.setAttribute(this.flowSVG.nativeElement, 'transform', graphTransform );
    // this.flowSVG.nativeElement.
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag($event: MouseEvent): void {
    // 减去偏移值
    this.mousePosition.x = $event.x - this.flowContainer.nativeElement.offsetLeft;
    this.mousePosition.y = $event.y - this.flowContainer.nativeElement.offsetTop;

    // debugger
    // if (!this.draggingNode) {
    //   return;
    // }
    if (this.isGraphOnDrag) {
      this.render.setStyle($event.srcElement, 'cursor', 'move');
      // $event.srcElement.style.cursor = 'pointer';
      // draggingStart
      const graphTransform = `translate(${$event.x - this.draggingStart.x},${$event.y - this.draggingStart.y})`;
      this.render.setAttribute(this.flowGraph.nativeElement, 'transform', graphTransform);
    } else if (this.draggingNode) {
      this.render.setStyle($event.srcElement, 'cursor', 'move');
      this.draggingNode.x = $event.x - this.draggingStart.x;
      this.draggingNode.y = $event.y - this.draggingStart.y;
      this.tryLinks();
    } else {
      return;
    }


  }
  @HostListener('document:mouseup', ['$event'])
  onDragEnd($event: MouseEvent): void {
    this.render.setStyle($event.srcElement, 'cursor', '');
    // if (!this.draggingNode) {
    //   return;
    // }
    if (this.isGraphOnDrag) {
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
