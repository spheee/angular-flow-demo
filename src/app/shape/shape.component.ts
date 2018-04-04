import { Component, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { Shape } from '../interface/shape';
import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';

import { ShapeSvgOption, ShapeSVGFactory } from './shape.svgFactory';


@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})


export class ShapeComponent implements OnInit, OnChanges {
  @Input() shape: Shape;
  @Input() index: string;

  options: ShapeSvgOption;

  constructor(private ele: ElementRef) {
    this.options = {
      width: 100,
      height: 120,
      id: ''
    };
  }

  ngOnInit() {
    const svg = new ShapeSVGFactory(this.options, this.ele, this.shape);
    // console.log(this.shape);
  }
  ngOnChanges() {
    console.log('this is really matters');
  }
}
