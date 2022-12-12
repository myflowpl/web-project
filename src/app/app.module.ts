import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { ConfirmDialog } from './ui/confirm/confirm.dialog';
import { AuthModule } from './auth/auth.module';
import { BASE_URL } from './api/api.config';
import { environment } from '../environments/environment';

export class AppMockService {}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ConfirmDialog,
    AuthModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    {
      provide: AppService,
      useClass: environment.production ? AppService : AppMockService,
    },
    {
      provide: BASE_URL,
      useValue: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://project.com/api',
    },
    // {
    //   provide: BASE_URL,
    //   useValue: environment.baseUrl,
    // },
    // {
    //   provide: BASE_URL,
    //   useFactory: async (http: HttpClient) => {
    //     return window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://project.com/api'
    //   },
    //   deps: [HttpClient]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private appService: AppService
  ) {

    // console.log('app module id', this.appService.id)
  }
 }
