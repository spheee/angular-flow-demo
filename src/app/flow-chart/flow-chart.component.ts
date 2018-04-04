import {
  Component,
  OnInit
} from '@angular/core';
import * as d3 from 'd3';

import * as dagreD3 from 'dagre-d3';
import { SceneService } from '../scene.service';
import { SceneDialog } from '../ywtest/scene-dialog';



@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css']
})
export class FlowChartComponent implements OnInit {

  sceneDialogs: SceneDialog[];

 constructor(private sceneService: SceneService) {}


  ngOnInit() {
    this.buildFlowChart();
    this.getSceneDialog();
  }

  getSceneDialog(): void {
    this.sceneService
      .getSceneDialogs()
      .subscribe(sceneDialogs => {
        this.sceneDialogs = sceneDialogs;
        console.log(this.sceneDialogs);
      });
  }


  buildFlowChart(flowNode ?: any): void {
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
