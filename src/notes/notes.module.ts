import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesMiddleware } from '../middleware/notes.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [
    {
      provide: 'NOTES_SERVICE',
      useClass: NotesService,
    },
  ],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotesMiddleware).forRoutes('notes/:noteId');
  }
}
