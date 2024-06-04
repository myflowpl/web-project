import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact.page';
import { RouterModule } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { FormsModule } from '@angular/forms';
import { ContactAdminPage } from './contact-admin/contact-admin.page';


@NgModule({
  declarations: [
    ContactPage,
    ContactInfoComponent,
    ContactAdminPage,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class ContactModule { }
