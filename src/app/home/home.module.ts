import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { Error404Page } from './pages/error404/error404.page';



@NgModule({
  declarations: [
    HomePage,
    ContactPage,
    Error404Page
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
