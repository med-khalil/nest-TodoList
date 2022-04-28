import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo-service/todo.service';
import { addTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { ToDo } from './Model/todo.model';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoservice: TodoService) {
    this.todos = [new ToDo('1', 'Sport', 'Faire du sport')];
  }

  todos: ToDo[] = [];
  @Get()
  getTodos() {
    return { ...this.todoservice.getTodos() };
  }
  @Get(':id')
  getTodoSpec(@Param('id') id: string): ToDo {
    return this.todoservice.getTodoSpec(id);
  }
  @Post()
  addTodo(@Body() newTodoData: addTodoDto): addTodoDto {
    return this.todoservice.addTodo(newTodoData);
  }
  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() newTodoData: UpdateTodoDto,
  ): UpdateTodoDto {
    return this.todoservice.updateTodo(id, newTodoData);
  }
  @Post(':id')
  removetodo(@Param('id') id: string): ToDo {
    return this.todoservice.removetodo(id);
  }
}
