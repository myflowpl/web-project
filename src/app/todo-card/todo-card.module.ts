import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './todo-card.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoItemButtonComponent } from './add-todo-item-button/add-todo-item-button.component';


@NgModule({
  declarations: [
    TodoCardComponent,
    TodoItemComponent,
    AddTodoItemButtonComponent,
  ],
  exports: [
    TodoCardComponent,
  ],
  imports: [
    CommonModule,
  ],
})

export class TodoCardModule {}
