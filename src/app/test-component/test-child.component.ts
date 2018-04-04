import { Component, Input } from '@angular/core';
// import { Hero } from './hero';

@Component({
  selector: 'app-test-child',
  template: `
    <p>this is test-child
  `
    // <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
})
export class TestChildComponent {
//   @Input() hero: Hero;
//   @Input('master') masterName: string;
}
