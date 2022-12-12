import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';



@NgModule({
  declarations: [
    HomePage,
    ContactPage
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
