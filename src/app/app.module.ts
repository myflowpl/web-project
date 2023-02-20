import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainDirective } from './directives/main.directive';
import { IfDirective } from './directives/if.directive';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainDirective,
    IfDirective,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
