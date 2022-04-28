import { Injectable, NotFoundException } from '@nestjs/common';
import { addTodoDto } from 'src/todo/DTO/add-todo.dto';
import { UpdateTodoDto } from 'src/todo/DTO/update-todo.dto';
import { ToDo } from 'src/todo/Model/todo.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TodoService {
  todos: ToDo[] = [];
  public findToDo(id: string): ToDo {
    const item = this.todos.find((e) => e.id == id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  getTodos() {
    return { ...this.todos };
  }

  getTodoSpec(id: string): ToDo {
    const todo = this.findToDo(id);
    if (!todo) return null;
    return todo;
  }

  addTodo(newTodoData: addTodoDto): addTodoDto {
    let todo = new ToDo();
    todo.id = uuidv4();
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: string, newTodoData: UpdateTodoDto): UpdateTodoDto {
    let todo = this.findToDo(id);
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }

  removetodo(id: string): ToDo {
    const todo = this.findToDo(id);
    if (!todo) return null;
    this.todos = this.todos.filter((e) => e.id != id);
    return null;
  }
}
