import { TodoStatusEnum } from '../Enums/todo-status.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './add-todo.dto';

export class SearchTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
  @IsOptional()
  page: number;
  @IsOptional()
  offset: number;
}
