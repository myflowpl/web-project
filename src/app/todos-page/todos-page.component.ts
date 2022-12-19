import { Component } from '@angular/core';
import TodoModel from '../model/todo.model';
import TodoItemModel from '../model/todo-item.model';

const PREDEFINED_TODOS: TodoModel[] = [
  { id: 'card-1', name: 'card 1', items: [] },
  { id: 'card-2', name: 'card 2', items: [{ id: 'todoItem-1', name: 'test 1', isDone: false }] },
  {
    id: 'card-3', name: 'card 3', items: [
      { id: 'todoItem-1', name: 'test 1', isDone: false },
      { id: 'todoItem-2', name: 'test 2', isDone: false },
      { id: 'todoItem-3', name: 'test 3', isDone: false },
    ],
  },
];

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent {
  public todos: TodoModel[] = [...PREDEFINED_TODOS];
  private lastCardId = 3;

  addTodoCard = (cardName: string) => {
    this.todos.push({
      id: `card-${this.lastCardId + 1}`,
      name: cardName,
      items: [],
    });

    this.lastCardId = this.lastCardId + 1;
  };

  removeCardById = (cardId: string) => {
    this.todos = this.todos.filter(({ id }) => id.toLowerCase() !== cardId.toLowerCase());
  };

  addTodoItemToCard = ({ cardId, todoItemName }: { cardId: string; todoItemName: string }) => {
    const card: TodoModel | undefined = this.todos.find(({ id }) => id === cardId);

    if (card === undefined) {
      console.error(`no card with ID ${cardId}`);
      return;
    }

    const newTodoId = card.items.length === 0
      ? 0
      : Math.max(...card.items
      .map(({ id }) => id.split('-')[1])
      .map(id => Number.parseInt(id, 10)),
    ) + 1;

    card.items.push({
      id: `todoItem-${newTodoId}`,
      isDone: false,
      name: todoItemName,
    });
  };

  removeTodoItem({ cardId, todoItemId }: { cardId: string; todoItemId: string }) {
    const card: TodoModel | undefined = this.todos.find(({ id }) => id === cardId);

    if (card === undefined) {
      console.error(`no card with ID ${cardId}`);
      return;
    }

    card.items = card.items.filter(({ id }) => id !== todoItemId);

  }

  changeTodoItem({ cardId, todoItemId, newTodoItemModel }: { cardId: string; todoItemId: string; newTodoItemModel: TodoItemModel }) {
    const card: TodoModel | undefined = this.todos.find(({ id }) => id === cardId);

    if (card === undefined) {
      console.error(`no card with ID ${cardId}`);
      return;
    }

    const cardItem: TodoItemModel | undefined = card.items.find(({ id }) => id === todoItemId);

    if (cardItem === undefined) {
      console.error(`no item in card ${cardId} with ID: ${todoItemId}`);
      return;
    }

    cardItem.isDone = newTodoItemModel.isDone;
  }
}
