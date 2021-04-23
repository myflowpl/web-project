import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <p>
      My Company 2021 &copy;
    </p>
  `,
  styles: [`
    p {
      border-top: 1px solid lightgray;
      text-align: center;
      padding: 10px 0;
      margin-top: 20px;
    }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
