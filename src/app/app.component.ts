import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.5em;
      }
    `
  ]
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
