import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosPageModule } from './todos-page/todos-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PetApi } from '../api-client';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodosPageModule,
    HomePageModule,
  ],
  providers: [
    // PetApi,
    // {
    //   provide: PetApi,
    //   useClass: PetApi,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
