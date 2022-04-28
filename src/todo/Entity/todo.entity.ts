import { TodoStatusEnum } from '../Enums/todo-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';

@Entity('todo')
export class TodoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string;
  @Column({})
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
}
