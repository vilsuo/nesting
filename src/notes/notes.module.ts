import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CommentsModule } from 'src/comments/comments.module';
import { NotesMiddleware } from 'src/middleware/notes.middleware';

@Module({
  imports: [CommentsModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotesMiddleware).forRoutes('notes/:id');
  }
}
