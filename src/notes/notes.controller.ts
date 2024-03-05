import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { Note } from 'src/decorators/note.decorator';
import { Note as NoteEntity } from './interfaces/note.interface';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async findAll() {
    return this.notesService.findAll();
  }

  @Post()
  async create(@Body() body: CreateNoteDto) {
    const parsedContent = body.content;
    const note = await this.notesService.create({
      content: parsedContent,
    });
    return note;
  }

  @Get(':id')
  async findOne(@Note() note: NoteEntity) {
    return note;
  }

  @Post(':id/comments')
  async createComment(
    @Note() note: NoteEntity,
    @Body() body: CreateCommentDto,
  ) {
    const parsedContent = body.content;
    const comment = await this.commentsService.create(note.id, {
      content: parsedContent,
    });

    return comment;
  }

  @Get(':id/comments')
  async getComments(@Note() note: NoteEntity) {
    // find the Note Comments
    return await this.commentsService.findAll(note.id);
  }
}
