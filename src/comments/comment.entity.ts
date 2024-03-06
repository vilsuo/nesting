import { Content } from 'src/content.entity';
import { Note } from 'src/notes/note.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends Content {
  @ManyToOne(() => Note, (note) => note.comments, { nullable: false })
  note: Note;
}
