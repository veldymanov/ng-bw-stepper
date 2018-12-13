import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [``],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit{
  title = 'bwreport-app';

  constructor( ) {}

  ngOnInit(): void { }

}
