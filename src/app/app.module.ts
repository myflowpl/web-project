import { InjectionToken, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosPageModule } from './todos-page/todos-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavbarComponent } from './navbar/navbar.component';
import { Configuration, PetApi } from '../api-client';
import { AuthModule } from './auth/auth.module';
import { ErrorsPage } from './pages/errors/errors.page';
import { HttpClientModule } from '@angular/common/http';

const DOMAIN = new InjectionToken<string>('Domain')

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorsPage,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    TodosPageModule,
    HomePageModule,
    HttpClientModule,
  ],
  providers: [
    // PetApi,
    // {
    //   provide: PetApi,
    //   useClass: PetApi,
    // },
    // {
    //   provide: DOMAIN,
    //   useValue: isDevMode() ? 'http://localhost:1337' : window.location.host,
    // },
    // {
    //   provide: Configuration,
    //   deps: [DOMAIN, AuthService],
    //   useFactory: (domain: string, authService: AuthService) => {
    //     const config = new Configuration({
    //       basePath: domain+'/api-clout',
    //       credentials: {
    //         bearer: () => authService.token
    //       }
    //     });
    //     return config;
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
