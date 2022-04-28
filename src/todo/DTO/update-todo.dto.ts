import { OmitType, PartialType } from '@nestjs/mapped-types';
import { TodoStatusEnum } from '../Enums/todo-status.enum';
import { addTodoDto } from './add-todo.dto';

export class UpdateTodoDto extends PartialType(addTodoDto) {
  status: TodoStatusEnum;
}
