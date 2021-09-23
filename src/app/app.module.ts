import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomePage } from './home/pages/home/home.page';
import { ContactPage } from './home/pages/contact/contact.page';
import { ContactDetailsComponent } from './home/components/contact-details/contact-details.component';
import { ContactDetailsPage } from './home/pages/contact-details/contact-details.page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactFormComponent } from './home/components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactCreatePage } from './home/pages/contact-create/contact-create.page';
import { LoaderComponent } from './shared/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthModule } from './auth/auth.module';
import { API_BASE_URL } from './app.config';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePage,
    ContactPage,
    ContactDetailsComponent,
    ContactDetailsPage,
    ContactFormComponent,
    ContactCreatePage,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    AuthModule,
  ],
  providers: [{
    provide: API_BASE_URL,
    useValue: environment.production ? '/api/' : 'http://localhost:3000'
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }



// typescript rzutowanie typów

// class User {
//   readonly id: number;
//   name: string;
//   role? = 'root';

//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }

// let user: User = {
//   id: 1,
//   name: "Piotr",
// };
// user.name = 'dsfds';
// // user.id = 55;

// console.log('name', (user as User).name)
// console.log('instance of', user instanceof User); // ???

// user = new User(2, 'Paweł')
// const user2 = new User(2, 'Paweł')

// console.log('instance of user2', user instanceof User); // ???

// class Admin extends User {

// }
