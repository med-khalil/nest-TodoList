import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
// const corsOptions = {
//   origin: ['localhost:3000'],
//   optionsSuccessStatus: 200,
// };
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(morgan('dev'));
  dotenv.config();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, enableDebugMessages: true }),
  );
  // app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
