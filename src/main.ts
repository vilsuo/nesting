import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // By default, if any error happens while creating the application
    // your app will exit with the code 1
    //abortOnError: false,
  });
  await app.listen(3000);
}
bootstrap();
