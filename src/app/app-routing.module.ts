import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPage } from './home/pages/contact/contact.page';
import { HomePage } from './home/pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: {
      layout: 'no-footer'
    }
  },
  {
    path: 'contact',
    component: ContactPage,
    data: {
      layout: 'main'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
