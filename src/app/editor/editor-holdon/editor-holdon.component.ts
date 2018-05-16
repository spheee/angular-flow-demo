import { Component, OnInit, ElementRef, Renderer, Renderer2, HostListener } from '@angular/core';
import { EditorHoldonService } from './editor-holdon.service';

@Component({
  selector: 'app-editor-holdon',
  templateUrl: './editor-holdon.component.html',
  styleUrls: ['./editor-holdon.component.css']
})
export class EditorHoldonComponent implements OnInit {

  currentNode: any;
  currentType  = -1;

  constructor(private editorHoldOnService: EditorHoldonService,
  private ele: ElementRef,
  private render: Renderer2) {
    editorHoldOnService.onHoldOn.subscribe(
      res => {
        if (res && res.node) {
          this.render.setStyle(ele.nativeElement, 'display', res.flag ? 'inline-block' : 'none');
          this.render.setStyle(ele.nativeElement, 'left', `${res.node.x}px`);
          this.render.setStyle(ele.nativeElement, 'top', `${res.node.y}px`);
          this.currentNode = res.node;
          this.currentType = res.node.dialogType;
        }
      }
    );
  }

  ngOnInit() {
  }
  @HostListener('mouseenter', ['$event'])
  onHoldon($event: MouseEvent) {
    this.render.setStyle(this.ele.nativeElement, 'display', 'inline-block');
  }
  @HostListener('mouseleave', ['$event'])
  offHoldon($event: MouseEvent) {
    this.render.setStyle(this.ele.nativeElement, 'display', 'none');
  }

}
