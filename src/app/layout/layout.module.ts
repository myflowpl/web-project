import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmDialog } from '../ui/confirm/confirm.dialog';
import { AppService } from '../app.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    // components
    FooterComponent,
    HeaderComponent,
    UserInfoComponent,

    // directives

    // pipes
  ],
  // kiedys -> serwisy
  providers: [AppService],
  imports: [CommonModule, ConfirmDialog, RouterModule, AuthModule],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {
  constructor(private appService: AppService) {
    // console.log('layotu module id', this.appService.id)
  }
}
