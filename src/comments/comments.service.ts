import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { Note } from 'src/notes/note.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAllByNote(note: Note) {
    return this.commentsRepository.find({
      where: { note: { id: note.id } },
    });
  }

  async create(note: Note, createCommentDto: CreateCommentDto) {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      note,
    });

    return await this.commentsRepository.save(comment);
  }
}
