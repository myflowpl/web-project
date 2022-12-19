import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() isDone: boolean;

  @Output() changeIsCheckedItemEmitter: EventEmitter<{ todoItemId: string, isDone: boolean }> = new EventEmitter();
  @Output() removeItemEmitter: EventEmitter<{ todoItemId: string }> = new EventEmitter();

  onCheckBoxClick = (target: any) => {
    this.changeIsCheckedItemEmitter.emit({
      todoItemId: this.id,
      isDone: target.checked,
    });
  };

  onRemoveItemClick = () => {
    this.removeItemEmitter.emit({ todoItemId: this.id });
  };
}
