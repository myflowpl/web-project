import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorsPage } from './pages/errors/errors.page';
import { TodosPageComponent } from './todos-page/todos-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'todos',
    component: TodosPageComponent
  },
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule)
  },
  {
    path: '**',
    // redirectTo: 'home'
    component: ErrorsPage,
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
