import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-b',
  template: `
    <p>
      b works!
    </p>
  `,
  styles: [
  ]
})
export class BComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
