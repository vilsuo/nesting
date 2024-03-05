import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/note.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'root',
      password: 'root',
      database: 'dev_db',
      entities: [Note, Comment],
      synchronize: true,
    }),
    NotesModule,
    CommentsModule,
  ],
})
export class AppModule {}
