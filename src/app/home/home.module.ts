import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkerDirective } from './directives/marker.directive';
import { HomeUserPage } from './pages/home-user/home-user.page';

@NgModule({
  declarations: [HomePage, ContactPage, MarkerDirective, HomeUserPage],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class HomeModule {}
