import TodoItemModel from './todo-item.model';

interface TodoModel {
  id: string;
  name: string;
  items: TodoItemModel[];
}

export default TodoModel;
