import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async findByPk(id: number): Promise<Note | null> {
    return this.notesRepository.findOneBy({ id });
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async view(id: number) {
    await this.notesRepository.increment({ id }, 'views', 1);
    //return await this.findByPk(id);

    /*
    return await this.notesRepository
      .createQueryBuilder()
      .update(Note)
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .returning('*')
      .execute();
    */
  }

  async findWithComments(id: number) {
    return await this.notesRepository.find({
      where: { id },
      relations: { comments: true },
    });
  }
}
