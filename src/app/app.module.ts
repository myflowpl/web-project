import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from './api/api.config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.production ? 'https://api.slackmap.com' : 'http://localhost:3000',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
