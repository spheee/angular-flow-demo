import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlowChartComponent } from './flow-chart/flow-chart.component';
import { FlowComponent } from './flow/flow.component';
import { EditorComponent } from './editor/editor.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'flow', component: FlowComponent },
  { path: 'flow-chart', component: FlowChartComponent },
  { path: 'edit', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RouteModule {}
