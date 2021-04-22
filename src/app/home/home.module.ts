import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPage } from './pages/contact/contact.page';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    HomePage,
    ContactPage,
  ],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
