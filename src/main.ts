import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { mainConfig } from './config/mainConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  mainConfig(app);

  await app.listen(configService.get<number>('port'));
}
bootstrap();
