import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, HostListener, Renderer2 } from '@angular/core';
import { EditorActionService } from './editor-action.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  // @ViewChild('dragContent',{read:ViewContainerRef}) dragContent: ViewContainerRef;
@ViewChild('dragContent') dragContent: ElementRef;
@ViewChild('editorMain') editorMain:ElementRef;

  isCollapsed = 'inline';
  /**
   * @description 正在拖拽添加
   */
  isOnAdd = false;

  constructor(protected render: Renderer2, protected editorActionService: EditorActionService ) { }

  ngOnInit() {
  }
  onDragStart(node, $event) {
    this.isOnAdd = true;

  }
  @HostListener('document:mousemove', ['$event'])
  onDrag($event: MouseEvent): void {
    if (this.isOnAdd) {
      this.render.setStyle(this.dragContent.nativeElement, 'left', $event.x + 'px');
      this.render.setStyle(this.dragContent.nativeElement, 'top', $event.y + 'px');
    }
  }
  @HostListener('document:mouseup', ['$event'])
  onDragEnd($event: MouseEvent): void {
    if(this.isOnAdd){
      if(this.dragContent.nativeElement.offsetLeft> 100 && this.dragContent.nativeElement.offsetTop >100){
        const node ={
          type:3,
          position:{
            x:this.dragContent.nativeElement.offsetLeft,
            y:this.dragContent.nativeElement.offsetTop
          }
        };
        this.editorActionService.addNode.emit(node);
      }
    }
    
    this.isOnAdd = false;

  }

}
