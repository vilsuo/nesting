import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from '../decorators/note.decorator';
import { Note as NoteEntity } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(
    @Inject('NOTES_SERVICE')
    private readonly notesService: NotesService,
  ) {}

  @Get()
  async findAll() {
    return await this.notesService.findAll();
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get(':noteId')
  async findOne(@Note() note: NoteEntity) {
    await this.notesService.view(note.id);
    return await this.notesService.findWithComments(note.id);
  }
}
