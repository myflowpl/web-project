import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { TopOutletDirective } from './top-outlet.directive';
import { TopContentDirective } from './top-content.directive';
import { BottomOutletDirective } from './bottom-outlet.directive';
import { BottomContentDirective } from './bottom-content.directive';



@NgModule({
  declarations: [
    MainLayoutComponent,
    TopOutletDirective,
    TopContentDirective,
    BottomOutletDirective,
    BottomContentDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    MainLayoutComponent,
    TopOutletDirective,
    TopContentDirective,
    BottomOutletDirective,
    BottomContentDirective,
  ],
})
export class LayoutModule { }
