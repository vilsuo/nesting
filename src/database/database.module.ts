import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptions } from '../config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: configService.get<string>('nodeEnv') !== 'production',
        ...configService.get<DatabaseOptions>('database'),
      }),
    }),
  ],
})
export class DatabaseModule {}
