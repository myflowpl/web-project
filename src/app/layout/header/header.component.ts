import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <span>My App</span>
      <a mat-button  routerLink="/" [routerLinkActive]="activeClass" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a mat-button  routerLink="/contact" routerLinkActive="active">Contact</a>
      <a mat-button  routerLink="/user" routerLinkActive="active">User</a>
      <span class="spacer"></span>

      <ng-container *ngIf="authService.profile$ | async as profile; else elseTemplate">
        <span>{{profile.user.name}}</span>
        <a mat-button (click)="authService.signOut()">Sign Out</a>
      </ng-container>
      <ng-template #elseTemplate>
        <a mat-button appAuth>Sign In</a>
        <a mat-button routerLink="/sign-up">Sign Up</a>
      </ng-template>

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
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
