import { Component, OnChanges, OnInit } from '@angular/core';
import { Student } from './student';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})


export class TestComponentComponent implements OnInit, OnChanges {


  x = 9;
  its = [{
      time: 1990
    },
    {
      time: 1991
    },
    {
      time: 1992
    },
    {
      time: 1993
    },
    {
      time: 1994
    },

    {
      time: 1995
    },
    {
      time: 1996
    },
    {
      time: 1997
    },
    {
      time: 1998
    },
    {
      time: 1999
    },
    {
      time: 2000
    },
    {
      time: 2001
    },
    {
      time: 2002
    },

  ];


  students: Student[] = [{
    name: 'hahhjsd',
    value: '1'
  }, {
    name: 'sdsdasdas',
    value: '2'

  }, {
    name: 'xxasdas',
    value: '3'
  }];
  student: Student;
  trys(event): void {
    this.student = event
  }
  constructor() {
    /**
     * 这段逻辑不应当存在与component之中？也不应当写成pipe，应当独立作为一个service
     */
    let addSelf;
    setTimeout(addSelf = () => {
      this.x++;
      setTimeout(addSelf, 1000);
    }, 1000);
  }

  ngOnChanges() {
    debugger
  }

  ngOnInit() {}
}
