import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPage } from './pages/contact/contact.page';
import { HomePage } from './pages/home/home.page';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [
    HomePage,
    ContactPage,
    ContactDetailsComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
