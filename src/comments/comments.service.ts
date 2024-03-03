import { Injectable } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private readonly comments: Comment[] = [];

  async findAll(noteId: number) {
    return this.comments.filter((comment) => comment.noteId === noteId);
  }

  async create(noteId: number, createCommentDto: CreateCommentDto) {
    const parsedContent = createCommentDto.content;

    const comment: Comment = {
      id: this.comments.length + 1,
      content: parsedContent,
      createdAt: new Date(),
      noteId,
    };

    this.comments.push(comment);
    return comment;
  }
}
