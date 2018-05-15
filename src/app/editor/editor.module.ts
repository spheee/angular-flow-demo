import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorHeaderComponent } from './editor-header/editor-header.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { EditorSidebarComponent } from './editor-sidebar/editor-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMainComponent } from './editor-main/editor-main.component';
import { EditorActionService } from './editor-action.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  declarations: [
    EditorComponent,
    EditorHeaderComponent,
    // EditorSidebarComponent,
    EditorMainComponent,
  ],
  providers: [EditorActionService]
})
export class EditorModule { }
