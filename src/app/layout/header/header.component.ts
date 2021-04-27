import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../auth/services/auth.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <span translate>MY_APP</span>
      <a mat-button  routerLink="/" [routerLinkActive]="activeClass" [routerLinkActiveOptions]="{exact: true}">{{ 'HOME' | translate}}</a>
      <a mat-button  routerLink="/contact" routerLinkActive="active" translate>CONTACT2</a>
      <a mat-button  routerLink="/user" routerLinkActive="active">{{ 'USER' | translate}}</a>
      <a mat-button  routerLink="/music" routerLinkActive="active" [innerHTML]="'MUSIC' | translate"></a>
      <a mat-button  routerLink="/photo" routerLinkActive="active">{{ photo }} </a>
      <span class="spacer"></span>
      <span (click)="setLang('en')">[en]</span>
      <span (click)="setLang('pl')">[pl]</span>

      <ng-container *ngIf="authService.profile$ | async as profile; else elseTemplate">
        <span>{{'WITAJ' | translate:{name: profile.user.name} }}</span>
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

  photo = marker('PHOTO');

  activeClass = 'active';
  constructor(
    public translateService: TranslateService,
    public authService: AuthService
  ) { }

  setLang(lang: string) {
    this.translateService.use(lang);
  }
  ngOnInit(): void {
  }

}
