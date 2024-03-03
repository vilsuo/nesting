import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [CatsModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
