import { } from '@angular/forms';

import { Component, OnInit, OnChanges } from '@angular/core';
import {Student } from './student';


@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})


export class TestComponentComponent implements OnInit , OnChanges {

  students: Student[] = [
    {
      name: 'hahhjsd', value: '1'
    }, {
      name: 'sdsdasdas', value: '2'

    }, {
      name: 'xxasdas', value: '3'
    }
  ];
  student: Student;
  trys(event): void {
    this.student=event
  }
  constructor() { }

  ngOnChanges() {
    debugger
  }

  ngOnInit() {
  }
}
