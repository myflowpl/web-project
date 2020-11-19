import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';
import { ContactPage } from './pages/contact/contact.page';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPhotoUrlPipe } from './pipes/contact-photo-url.pipe';
import { ContactDetailsPage } from './pages/contact-details/contact-details.page';
import { ContactCreatePage } from './pages/contact-create/contact-create.page';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    HomePage,
    ContactPage,
    ContactComponent,
    ContactPhotoUrlPipe,
    ContactDetailsPage,
    ContactCreatePage,
    ContactFormComponent,
    LayoutComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    UserModule,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class HomeModule { }
