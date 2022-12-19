import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo-item-button',
  templateUrl: './add-todo-item-button.component.html',
  styleUrls: ['./add-todo-item-button.component.scss']
})
export class AddTodoItemButtonComponent {
  @Output() addTodoItemEmitter: EventEmitter<string> = new EventEmitter<string>();

  onAddButtonClick = (todoName: string) => {
    this.addTodoItemEmitter.emit(todoName);
  }
}
