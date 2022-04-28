import { TodoStatusEnum } from '../Enums/todo-status.enum';

export class ToDo {
  constructor(
    public id = '',
    public name: string = '',
    public description: string = '',
    public createdAt = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {}
}
