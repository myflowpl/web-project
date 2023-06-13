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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
