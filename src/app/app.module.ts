import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { API_BASE_URL } from './api/api.tokens';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.production ? 'http://localhost:3000' : 'http://localhost:3000',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
