import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Note } from 'src/decorators/note.decorator';
import { Note as NoteEntity } from '../notes/note.entity';

@Controller('notes/:noteId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Note() note: NoteEntity) {
    return await this.commentsService.findAllByNote(note);
  }

  // TODO: validate body
  @Post()
  async create(
    @Note() note: NoteEntity,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(note, createCommentDto);
  }
}
