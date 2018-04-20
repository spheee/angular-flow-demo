import {
    AfterViewInit, Attribute, Component, ElementRef, Input, OnInit, ViewChild, Renderer2
} from '@angular/core';
import { jsPlumb } from 'jsplumb';

import { Guid } from '../common/guid';
import { FlowNode } from '../flow/flow-node';
import { DialogType } from '../interface/dialogType.enum';
import { ShapeTypes } from './shape-type';
import { EnumEx } from '../common/enumEx';

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css']
})


export class FlowChartComponent implements OnInit, AfterViewInit {
  title = 'jsPlumb demo';
  jsPlumbInstance;
  // showConnectionToggle = false;
  common = {
    isSource: true,
    isTarget: true,
    endpoint: 'Rectangle'
  };
  // 入口
  startNode: FlowNode;
  model = 'sdkjsdks';
  ef = false;

  @ViewChild('container') container: ElementRef; // 定义容器视图
  @ViewChild('start') stater: ElementRef;        // 定义starter视图

  @Input() staterDescription: string;
  // @Input() eba: boolean;

  // types: ShapeTypes;
  types: any = DialogType;


  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.staterDescription = '车还';
    // this.eba = false;
    // this.types= new ShapeTypes();
    this.startNode = new FlowNode();
    this.startNode.editable = false;
    this.startNode.description = '意图入口';
    const ax = EnumEx.getNames(this.types);
    const ab = EnumEx.getValues(this.types);
    const ac = EnumEx.getNamesAndValues(this.types);
    // debugger

  }

  shape: string;
  /**
   * @description shape添加的点击事件
   * @param e 字符
   */
  addShape(e) {
    const shapeType = this.types[e];
    this.addNode(shapeType);
    // const shapeNode = new FlowNode(shapeType);
    // debugger
    // console.log('add a shape here ...');
  }
  /**
   * @description 新增一个节点
   * @param uuid 传入的uuid，可选
   * @param type 传入的type，可选
   * @param description 描述，可选
   */
  addNode(type ?: number, uuid ?: string, description ?: string) {
    uuid = uuid || new Guid().newGuid(),
      type = type || 0;
    description = description || '测试ADD';
    const newNode = new FlowNode(type);
    newNode.uuid = uuid;
    newNode.description = description;
    this.renderNode(this.container, newNode);
    // this.flowNodes.push(newNode);
    // this.renderFlowSVG(this.flowNodes);
  }
  /**
   * @description 渲染一个节点
   * @param parent 容器
   * @param node 节点
   */
  renderNode(parent: any, node: FlowNode) {
    const div = this.renderer.createElement('div');
    // debugger
    this.renderer.setAttribute(div, 'class', 'node ' + node.nodeShapeType);
    this.renderer.setAttribute(div, 'id', node.uuid);
    const text = this.renderer.createText(node.description);
    this.renderer.appendChild( div, text );
    this.renderer.appendChild( this.container.nativeElement, div);
    this.jsPlumbInstance.draggable(div);
    this.jsPlumbInstance.addEndpoint(div, {
      // anchor: 'Left',
      endpoint: 'Rectangle'
    }, this.common);

    // this.jsPlumbInstance.addEndpoint(parent)
  }
  renderLink() {

  }

  /**
   * @deprecated 使用EnumEx的静态方法替代
   * @description 解析枚举
   * @returns 枚举对应的数组
   */
  typeKeys(): Array < string > {
    // object ==> array
    const keys = Object.keys(this.types);
    return keys.slice(keys.length / 2);
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    const self = this;
    this.jsPlumbInstance = jsPlumb.getInstance();
    // 默认设置
    this.jsPlumbInstance.importDefaults({
      Connector : [ 'Flowchart', { stub: 20 , cornerRadius: 2.5} ],
      ConnectionOverlays: [[ "Arrow", { width:10, length:10, location:0.5, id:"arrow" ,paintStyle:{
        // fill:'red'
      }} ]],
      MaxConnections: 2
    });
    // debugger
    // self.container.nativeElement.contentEditable = true;
    this.jsPlumbInstance.ready(() => {
      this.jsPlumbInstance.setContainer(self.container.nativeElement);
      this.jsPlumbInstance.draggable(self.stater.nativeElement);
    });
    this.jsPlumbInstance.addEndpoint(self.stater.nativeElement, {
      anchor: '',
      endpoint: ['Dot',{
        radius: '2.5'
      }],
      overlays: [
        // [ "Label", { label:"foo", id:"label", location:[-0.5, -0.5] } ]
      ],
      connectorOverlays: [ 
        // [ "Arrow", { width:10, length:10, location:0.5, id:"arrow" ,paintStyle:{
        //   // fill:'red'
        // }} ],
        // [ "Label", { label:"foo", id:"label" } ]
      ]
      
    }, this.common);

  }
  setNodeName(event) {
    event.target.contentEditable = true;
    // this.startNode.editable=true;
  }
}
