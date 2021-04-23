import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <span>My App</span>
      <a mat-button  routerLink="/" [routerLinkActive]="activeClass" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a mat-button  routerLink="/contact" routerLinkActive="active">Contact</a>
      <span class="spacer"></span>
      <a mat-button >Sign In</a>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .active {
      color: red;
    }
  `]
})
export class HeaderComponent implements OnInit {

  activeClass = 'active';
  constructor() { }

  ngOnInit(): void {
  }

}
