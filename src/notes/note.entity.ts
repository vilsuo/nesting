import { Comment } from 'src/comments/comment.entity';
import { Content } from 'src/content.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Note extends Content {
  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Comment, (comment) => comment.note)
  comments: Comment[];
}
