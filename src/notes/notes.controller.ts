import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from 'src/decorators/note.decorator';
import { Note as NoteEntity } from './interfaces/note.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll() {
    return this.notesService.findAll();
  }

  // TODO: validate body
  @Post()
  async create(@Body() body: CreateNoteDto) {
    const parsedContent = body.content;
    const note = await this.notesService.create({
      content: parsedContent,
    });
    return note;
  }

  @Get(':noteId')
  async findOne(@Note() note: NoteEntity) {
    return this.notesService.view(note);
  }
}
