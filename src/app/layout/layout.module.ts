import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { AuthModule } from '../auth/auth.module';
import { CModule } from '../shared/c/c.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    AuthModule,
    CModule,
    TranslateModule,
  ],
  exports: [MainLayoutComponent]
})
export class LayoutModule { }
