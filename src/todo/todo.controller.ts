import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ToDo } from './Model/todo.model';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [new ToDo('1', 'Sport', 'Faire du sport')];
  }
  private findToDo(id: string): ToDo {
    const item = this.todos.find((e) => e.id == id);
    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }
  todos: ToDo[] = [];
  @Get()
  getTodos() {
    return { ...this.todos };
  }
  @Get(':id')
  getTodoSpec(@Param('id') id: string): ToDo {
    const todo = this.findToDo(id);
    if (!todo) return null;
    return todo;
  }
  @Post()
  addTodo(@Body() newTodoData: ToDo): ToDo {
    let todo = new ToDo();
    todo.id = uuidv4();
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() newTodoData: ToDo): ToDo {
    let todo = this.findToDo(id);
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }
  @Post(':id')
  removetodo(@Param('id') id: string): ToDo {
    const todo = this.findToDo(id);
    if (!todo) return null;
    this.todos = this.todos.filter((e) => e.id != id);
    return null;
  }
}
