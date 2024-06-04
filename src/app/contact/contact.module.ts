import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact.page';
import { RouterModule } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';


@NgModule({
  declarations: [
    ContactPage,
    ContactInfoComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    RouterModule,
  ]
})
export class ContactModule { }
