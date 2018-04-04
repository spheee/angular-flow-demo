import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';

export interface ShapeSvgOption {
  width: number;
  height: number;
  id: string;
}

export class ShapeSVGFactory {
  options: ShapeSvgOption;
  svg: any;
  shape: any;
  /**
   * @description 构造函数
   * @param options 配置项
   * @param element 附着元素容器
   * @param shape shape类型
   */
  constructor(options, element, shape) {
    this.shape = shape;
    this.options = options;
    // options = Object.assign(this.options, options);
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height)
      .attr('class', 'shape-' + this.shape.type);
    this.renderShape();
  }
  renderShape(): void {
    const render = new dagreD3.render();
    const gf = new dagreD3.graphlib.Graph().setGraph({});

    // let w = this.options.width,
    // h = this.options.height;
    render.shapes().doublerect = function (parent, bbox, node) {
      const w = bbox.width,
        h = bbox.height;

      let svgDefs = parent.append('defs');
      let rectGroup =
        svgDefs.append('g').attr('id', 'double-rect');
      rectGroup.append('rect')
        .attr('width', w).attr('height', h)
        .style('fill', '#F4F4F4')
        .style('stroke-width', '1')
        .style('stroke', '#7AB1F4');
      rectGroup.append('rect')
        .attr('width', w * 0.8).attr('height', h).attr('x', w * 0.1)
        .style('fill', 'white').style('stroke-width', '1').style('stroke', '#7AB1F4')



      let use =
        parent
        .insert('use', ':first-child')
        .attr('xlink:href', '#double-rect')
        .attr('transform', "translate(" + (-w / 2) + "," + (-h / 2) + ")"); //h * 3 / 4

      return use
      // let points = [{
      //       x: 0,
      //       y: 0
      //     }, {
      //       x: 0.1 * w,
      //       y: 0
      //     }, {
      //       x: 0.9 * w,
      //       y: 0
      //     }, {
      //       x: w,
      //       y: 0
      //     },
      //     {
      //       x: w,
      //       y: -h
      //     }, {
      //       x: 0.9 * w,
      //       y: -h
      //     }, {
      //       x: 0.1 * w,
      //       y: -h
      //     }, {
      //       x: 0,
      //       y: -h
      //     }
      //   ],

      //   shapeSvg = parent.insert("polygon", ":first-child")
      //   .attr("points", points.map(function (d) {
      //     return d.x + "," + d.y;
      //   }).join(" "))
      //   .attr("transform", "translate(" + (-w / 2) + "," + (h * 3 / 4) + ")");
      // node.intersect = function (point) {
      //   return dagreD3.intersect.polygon(node, points, point);
      // };
      // return shapeSvg;
    };
    render.shapes().hexagon = function (parent, bbox, node) {
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
    render.shapes().arrow = function (parent, bbox, node) {
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
    render.shapes().fatHexgon = function(parent, bbox, node) {

    };
    // TODO:longrect需要做
    // render.shapes().longrect=function(parent,bbox,node){

    // }

    let shapeType = 'rect';
    switch (this.shape.type) {
      case 'a':
        shapeType = 'doublerect';
        break;
      case 'b':
        shapeType = 'diamond';
        break;
      case 'c':
        shapeType = 'rect';
        break;
      case 'd':
        shapeType = 'hexagon';
        break;
      case 'e':
        shapeType = 'arrow';
        break;
      case 'f':
        shapeType = 'ellipse';
        break;
      default:
        // console.log(this.shape.type);


        break;
    }
    gf.setNode(this.shape.description, {
      shape: shapeType
    });
    render(this.svg, gf);
  }

}
