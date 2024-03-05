import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Note } from 'src/notes/interfaces/note.interface';
import { NotesService } from 'src/notes/notes.service';

// temp fix?
interface NoteRequest extends Request {
  note: Note;
}

@Injectable()
export class NotesMiddleware implements NestMiddleware {
  constructor(private readonly notesService: NotesService) {}

  async use(req: NoteRequest, res: Response, next: NextFunction) {
    const parsedId = Number(req.params.noteId);

    const note = await this.notesService.findByPk(parsedId);
    if (!note) {
      throw new HttpException('!Note', HttpStatus.NOT_FOUND);
      // return res
      //   .status(HttpStatus.NOT_FOUND)
      //   .send({ message: 'Note does not exist' });
    }

    req.note = note;
    return next();
  }
}
