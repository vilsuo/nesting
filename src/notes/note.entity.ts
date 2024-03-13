import { Comment } from '../comments/comment.entity';
import { Content } from '../content.entity';
import { Column, Entity, OneToMany, Repository } from 'typeorm';

@Entity()
export class Note extends Content {
  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Comment, (comment) => comment.note)
  comments: Comment[];
}

export type NotesRepository = Repository<Note>;
