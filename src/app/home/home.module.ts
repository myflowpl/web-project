import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPhotoUrlPipe } from './pipes/contact-photo-url.pipe';
import { ContactDetailsPage } from './pages/contact-details/contact-details.page';


@NgModule({
  declarations: [HomePage, ContactPage, ContactComponent, ContactPhotoUrlPipe, ContactDetailsPage],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
