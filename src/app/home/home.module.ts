import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePage,
    ContactPage
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class HomeModule { }
