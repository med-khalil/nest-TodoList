import { IsNotEmpty, MinLength } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty({ message: 'required field' })
  @MinLength(3, { message: 'min length is 3' })
  name: string;
  @MinLength(10)
  description: string;
}
