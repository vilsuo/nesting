import { Injectable } from '@nestjs/common';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async findByPk(id: number): Promise<Note | undefined> {
    return this.notes.find((note) => note.id === id);
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const parsedContent = createNoteDto.content;

    const note: Note = {
      id: this.notes.length + 1,
      content: parsedContent,
      createdAt: new Date(),
      views: 0,
    };

    this.notes.push(note);
    return note;
  }

  async view(note: Note) {
    note.views = note.views + 1;
    this.notes = this.notes.map((n) => (n.id === note.id ? note : n));
    return note;
  }
}
