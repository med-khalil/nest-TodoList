import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { TodoService } from './todo-service/todo.service';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { SearchTodoDto } from './DTO/search-todo.dto';
import { ToDo } from './Model/todo.model';

@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) {
    this.todos = [new ToDo('1', 'Sport', 'Faire du sport')];
  }
  todos: ToDo[] = [];
  @Get()
  getTodos(@Req() request: Request): ToDo[] {
    // console.log(request);
    return this.todos;
  }
  @Post('fake')
  addTodo(@Body() newTodoData: ToDo): ToDo {
    let todo = new ToDo();
    // const { name, description} = newTodoData;
    todo.id = uuidv4();
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }
  @Get('version')
  version() {
    return '1';
  }
}
