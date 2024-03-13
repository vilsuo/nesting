import { Content } from '../content.entity';
import { Note } from '../notes/note.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends Content {
  @ManyToOne(() => Note, (note) => note.comments, { nullable: false })
  note: Note;
}
