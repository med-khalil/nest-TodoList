import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from '../Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from '../DTO/update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from '../DTO/search-todo.dto';
import { TodoStatusEnum } from '../Enums/todo-status.enum';
import { faker } from '@faker-js/faker';
import { StatsTodoDto } from '../DTO/stats-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }
  async generateFakeData(count: number) {
    const enums = [
      TodoStatusEnum.actif,
      TodoStatusEnum.waiting,
      TodoStatusEnum.done,
    ];
    for (let i = 0; i < count; i++) {
      const todo = new TodoEntity();
      todo.name = faker.name.firstName();
      todo.description = faker.lorem.sentence();
      todo.status = enums[faker.random.number(enums.length - 1)];
      await this.todoRepository.save(todo);
    }
  }
  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async getStats(statsTodoDto: StatsTodoDto): Promise<TodoEntity[]> {
    const start = statsTodoDto.start || '2018-04-15';
    const end = statsTodoDto.end || '2023-04-15';
    const result = await this.todoRepository.query(`
    SELECT status,count(*) as count FROM todo
    WHERE deletedAt IS NULL
    AND createdAt BETWEEN '${start}' AND '${end}'
    GROUP BY status
    `);

    console.log(start, '\n', end);
    return result;
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    const page = searchTodoDto.page || 10;
    const offset = searchTodoDto.offset || 0;
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    // console.log('criterias', ...criterias);
    if (criterias.length) {
      return this.todoRepository.find({
        withDeleted: true,
        where: criterias,
        skip: offset,
        take: page,
      });
    }
    return this.todoRepository.find({
      withDeleted: true,
      skip: offset,
      take: page,
    });
  }
}
