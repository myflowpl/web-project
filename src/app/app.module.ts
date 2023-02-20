import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainDirective } from './directives/main.directive';
import { IfDirective } from './directives/if.directive';
import { HomePage } from './pages/home/home.page';
import { MarkDirective } from './directives/mark.directive';
import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainDirective,
    IfDirective,
    HomePage,
    MarkDirective,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
