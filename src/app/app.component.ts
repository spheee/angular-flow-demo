import {
  Component,
  OnInit
} from '@angular/core';
// import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }
  title = 'app';
  ngOnInit() {
    // const ts = new TestService();
    console.log('this is app-root');
  }
}
