import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, MinLength } from 'class-validator';
import { TodoStatusEnum } from '../Enums/todo-status.enum';
import { addTodoDto } from './add-todo.dto';

export class UpdateTodoDto extends PartialType(addTodoDto) {
  @IsOptional()
  @MinLength(3, { message: 'min length is 3' })
  name: string;
  @IsOptional()
  @MinLength(10, { message: 'min length is 10' })
  description: string;
  status: TodoStatusEnum;
}
