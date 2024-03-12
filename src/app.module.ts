import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    NotesModule,
    CommentsModule,
  ],
})
export class AppModule {}
