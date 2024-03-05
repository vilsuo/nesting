import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Note as NoteEntity } from '../notes/interfaces/note.interface';
import { Note } from 'src/decorators/note.decorator';

@Controller('notes/:noteId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // TODO: validate body
  @Post()
  async create(@Note() note: NoteEntity, @Body() body: CreateCommentDto) {
    const parsedContent = body.content;
    const comment = await this.commentsService.create(note.id, {
      content: parsedContent,
    });

    return comment;
  }

  @Get()
  async findAll(@Note() note: NoteEntity) {
    return await this.commentsService.findAllByNote(note.id);
  }
}
