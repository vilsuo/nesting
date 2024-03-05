import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [NotesModule, CommentsModule],
})
export class AppModule {}
