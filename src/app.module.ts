import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './todo/first.middleware';

import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, MorganModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
