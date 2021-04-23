import { Component, OnInit } from '@angular/core';

const padding = 15;

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      padding: 0 ${padding}px;
    }
  `]
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
