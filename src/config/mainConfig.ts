import { INestApplication, ValidationPipe } from '@nestjs/common';

export const mainConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
};
