import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPhotoUrlPipe } from './pipes/contact-photo-url.pipe';


@NgModule({
  declarations: [HomePage, ContactPage, ContactComponent, ContactPhotoUrlPipe],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
