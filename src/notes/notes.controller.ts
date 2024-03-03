import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Response } from 'express';
import { CreateNoteDto } from './dto/create-note.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

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
  async findOne(
    @Param() params: { id: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const parsedId = Number(params.id);
    const note = await this.notesService.findByPk(parsedId);
    if (!note) {
      res.status(HttpStatus.NOT_FOUND);
      return { message: 'Note does not exist' };
    }
    return note;
  }

  @Post(':id/comments')
  async createComment(
    @Param() params: { id: string },
    @Body() body: CreateCommentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // find the Note
    const parsedId = Number(params.id);
    const note = await this.notesService.findByPk(parsedId);
    if (!note) {
      res.status(HttpStatus.NOT_FOUND);
      return { message: 'Note does not exist' };
    }

    // create the Comment
    const parsedContent = body.content;
    const comment = await this.commentsService.create(note.id, {
      content: parsedContent,
    });

    return comment;
  }

  @Get(':id/comments')
  async getComments(
    @Param() params: { id: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    // find the Note
    const parsedId = Number(params.id);
    const note = await this.notesService.findByPk(parsedId);
    if (!note) {
      res.status(HttpStatus.NOT_FOUND);
      return { message: 'Note does not exist' };
    }

    // find the Note Comments
    return await this.commentsService.findAll(note.id);
  }
}
