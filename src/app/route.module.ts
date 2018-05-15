import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'edit', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RouteModule {}
