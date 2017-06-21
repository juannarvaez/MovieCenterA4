import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  	<header></header>
  	<router-outlet></router-outlet>
  	<footer></footer>
  	`,
})
export class AppComponent  { name = 'Angular'; }
