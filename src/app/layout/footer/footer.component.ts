import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <p>
      <a href="https://myflow.pl">My Flow Studio</a>
    </p>
  `,
  styles: [`
  a {
    display: block;
    text-align: center;
    padding: 5px;
    border-top: 1px solid gray;
    color: green;
  }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
