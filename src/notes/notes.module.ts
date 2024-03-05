import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesMiddleware } from 'src/middleware/notes.middleware';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotesMiddleware).forRoutes('notes/:noteId');
  }
}
