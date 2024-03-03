import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [CommentsModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
