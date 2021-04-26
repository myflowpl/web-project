import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from './api/api.config';
import { environment } from '../environments/environment';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    LayoutModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000',
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.production ? 'http://localhost:3000' : 'http://localhost:3000',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
