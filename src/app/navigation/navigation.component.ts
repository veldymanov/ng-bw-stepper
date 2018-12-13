import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  styles: [`
  :host {
    display: block;
    margin-top: 64px;
  }
  `],
  template: `
    <app-top-nav></app-top-nav>
    <router-outlet></router-outlet>
  `
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
