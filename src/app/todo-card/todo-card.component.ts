import { Component, EventEmitter, Input, Output } from '@angular/core';
import TodoItemModel from '../model/todo-item.model';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() items: TodoItemModel[] = [];

  @Output() removeCardEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() addTodoItemEmitter: EventEmitter<{ cardId: string, todoItemName: string }> = new EventEmitter();
  @Output() changeTodoItemEmitter: EventEmitter<{ cardId: string, todoItemId: string, newTodoItemModel: TodoItemModel }> = new EventEmitter();
  @Output() removeTodoItemEmitter: EventEmitter<{ cardId: string, todoItemId: string }> = new EventEmitter();

  onRemoveCardClick = () => {
    this.removeCardEmitter.emit(this.id);
  };

  onAddTodoItem = (todoItemName: string) => {
    this.addTodoItemEmitter.emit({
      todoItemName,
      cardId: this.id,
    });
  };

  onIsDoneChangeAction = ({ todoItemId, isDone }: { todoItemId: string; isDone: boolean }) => {
    const currentTodoItem: TodoItemModel | undefined = this.items.find(({ id }) => id === todoItemId);

    if (currentTodoItem === undefined) {
      console.error(`No todo item in ${this.id} with ID: ${todoItemId}`);
      return;
    }

    this.changeTodoItemEmitter.emit({
      cardId: this.id,
      todoItemId,
      newTodoItemModel: {
        ...currentTodoItem,
        isDone,
      },
    });
  };

  onRemoveItemAction = ({ todoItemId }: { todoItemId: string }) => {
    this.removeTodoItemEmitter.emit({
      todoItemId,
      cardId: this.id,
    });
  };
}
