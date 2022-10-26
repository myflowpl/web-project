import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <div class="mask" *ngIf="loading"></div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0, .2)
    }
  `]
})
export class LoaderComponent implements OnInit {

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  tap<T>() {
    return tap<T>({
      subscribe: () => this.loading = true,
      finalize: () => this.loading = false,
    });
  }

}
