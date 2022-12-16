import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { ConfirmDialog } from './ui/confirm/confirm.dialog';
import { AuthModule } from './auth/auth.module';
import { BASE_URL } from './api/api.config';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Configuration } from 'api-client';

export class AppMockService {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ConfirmDialog,
    AuthModule,
    HttpClientModule,
    CommonModule,
    HomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    // isDevMode() ? StoreDevtoolsModule.instrument() : [],
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    AppService,
    {
      provide: AppService,
      useClass: environment.production ? AppService : AppMockService,
    },
    // {
    //   provide: Configuration,
    //   useFactory: (basePath: string) => {
    //     return new Configuration({
    //       basePath
    //     });
    //   },
    //   deps: [BASE_URL]
    // },
    {
      provide: BASE_URL,
      useValue:
        window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://project.com/api',
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
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private appService: AppService) {
    // console.log('app module id', this.appService.id)
  }
}
