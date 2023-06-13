import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomePage } from './home/home.page';
import { QuotesPage } from './quotes/quotes.page';
import { ImageBaseUrlPipe } from './pipes/image-base-url.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ItemComponent } from './home/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from './api/api.config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePage,
    QuotesPage,
    ImageBaseUrlPipe,
    HighlightDirective,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: BASE_URL,
      useFactory: () => {
        return environment.production ? '/api' : 'http://localhost:3000';
      },
      deps: [],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
