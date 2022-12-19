import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosPageComponent } from './todos-page.component';
import { TodoCardModule } from '../todo-card/todo-card.module';



@NgModule({
  declarations: [
    TodosPageComponent,
  ],
  exports: [
    TodosPageComponent,
  ],
  imports: [
    CommonModule,
    TodoCardModule,
  ],
})
export class TodosPageModule { }
