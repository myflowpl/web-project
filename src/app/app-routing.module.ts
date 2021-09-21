import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailsPage } from './home/pages/contact-details/contact-details.page';
import { ContactPage } from './home/pages/contact/contact.page';
import { HomePage } from './home/pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'contact',
    component: ContactPage,
    children: [{
      path: ':id',
      component: ContactDetailsPage,
      data: {
        title: 'Contact {{id}} Details',
        breadcrumbs: ['']
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
