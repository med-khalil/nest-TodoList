import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo-service/todo.service';
import { addTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { ToDo } from './Model/todo.model';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('todo')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class TodoController {
  constructor(private readonly todoservice: TodoService) {
    this.todoservice.todos = [new ToDo(1, 'Sport', 'Faire du sport')];
  }

  todos: ToDo[] = [];
  @Get()
  getTodos() {
    return { ...this.todoservice.getTodos() };
  }
  @Get(':id')
  getTodoSpec(@Param('id', ParseIntPipe) id: number): ToDo {
    return this.todoservice.getTodoSpec(id);
  }
  @Post()
  addTodo(@Body() newTodoData: addTodoDto): addTodoDto {
    return this.todoservice.addTodo(newTodoData);
  }
  @Patch(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() newTodoData: UpdateTodoDto,
  ): UpdateTodoDto {
    return this.todoservice.updateTodo(id, newTodoData);
  }
  @Post(':id')
  removetodo(@Param('id', ParseIntPipe) id: number): ToDo {
    return this.todoservice.removetodo(id);
  }
}
