import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const port = process.env.PORT ?? 8080;

  await app.listen(port);
}
bootstrap();
